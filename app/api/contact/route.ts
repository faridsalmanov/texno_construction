import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const SUBJECT_LABELS: Record<string, string> = {
  residential: "Residential construction",
  commercial: "Commercial construction",
  renovation: "Renovation works",
  consultation: "Consultation",
  other: "Other",
};

const ALLOWED_SUBJECTS = new Set([
  "",
  "residential",
  "commercial",
  "renovation",
  "consultation",
  "other",
]);

const MAX_NAME = 200;
const MAX_PHONE = 50;
const MAX_MESSAGE = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
};

type RateEntry = { count: number; resetAt: number };

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const rateStore = new Map<string, RateEntry>();

function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const first = xForwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateStore.get(ip);

  if (!existing || now >= existing.resetAt) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    return true;
  }

  rateStore.set(ip, { ...existing, count: existing.count + 1 });
  return false;
}

function parseContactBody(
  data: unknown
): { ok: true; payload: ContactPayload } | { ok: false } {
  if (!data || typeof data !== "object") {
    return { ok: false };
  }
  const o = data as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";
  const subject = typeof o.subject === "string" ? o.subject.trim() : "";

  if (!name || name.length > MAX_NAME) {
    return { ok: false };
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return { ok: false };
  }
  if (!phone || phone.length > MAX_PHONE) {
    return { ok: false };
  }
  if (!message || message.length > MAX_MESSAGE) {
    return { ok: false };
  }
  if (!ALLOWED_SUBJECTS.has(subject)) {
    return { ok: false };
  }

  return { ok: true, payload: { name, email, phone, message, subject } };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return NextResponse.json({ error: "server_config" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseContactBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const { name, email, phone, message, subject } = parsed.payload;
  const topicLabel = subject
    ? (SUBJECT_LABELS[subject] ?? subject)
    : "Not specified";

  const text = `New contact form submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${topicLabel}

Message:
${message}
`;

  const from =
    process.env.RESEND_FROM ?? "TEXNO Website <onboarding@resend.dev>";
  const safeName = name.replace(/[\r\n]+/g, " ").slice(0, 80);
  const emailSubject = subject
    ? `[Website] ${safeName} — ${topicLabel}`
    : `[Website] ${safeName}`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: emailSubject,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

export function GET(): NextResponse {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 });
}
