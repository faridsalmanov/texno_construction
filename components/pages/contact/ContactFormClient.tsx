"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ReactNode } from "react";
import { isValidContactEmail } from "@/lib/validation/contactEmail";
import { isValidContactName } from "@/lib/validation/contactName";
import { isValidContactMessage } from "@/lib/validation/contactMessage";
import { isValidAzerbaijanContactPhone } from "@/lib/validation/contactPhone";

export type ContactFormTranslations = {
  form_title: string;
  form_name: string;
  form_phone: string;
  form_email: string;
  form_subject: string;
  form_message: string;
  form_submit: string;
  form_sending: string;
  form_success: string;
  form_error: string;
  form_error_validation: string;
  form_phone_invalid: string;
  form_name_invalid: string;
  form_email_invalid: string;
  form_rate_limited: string;
  form_message_invalid: string;
  form_placeholder_name: string;
  form_placeholder_phone: string;
  form_placeholder_email: string;
  form_placeholder_message: string;
  form_subject_placeholder: string;
  form_subject_options: {
    residential: string;
    commercial: string;
    renovation: string;
    consultation: string;
    other: string;
  };
};

type SubmitState =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "validation_error"
  | "phone_invalid"
  | "name_invalid"
  | "email_invalid"
  | "message_invalid"
  | "rate_limited";

type ContactFormClientProps = {
  translations: ContactFormTranslations;
};

export function ContactFormClient({
  translations,
}: ContactFormClientProps): ReactNode {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      subject: String(fd.get("subject") ?? "").trim(),
    };

    if (!isValidContactName(body.name)) {
      setSubmitState("name_invalid");
      return;
    }
    if (!isValidContactEmail(body.email)) {
      setSubmitState("email_invalid");
      return;
    }
    if (!isValidAzerbaijanContactPhone(body.phone)) {
      setSubmitState("phone_invalid");
      return;
    }
    if (!isValidContactMessage(body.message)) {
      setSubmitState("message_invalid");
      return;
    }

    setSubmitState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        form.reset();
        setSubmitState("success");
        return;
      }

      if (res.status === 400) {
        setSubmitState("validation_error");
        return;
      }

      if (res.status === 429) {
        setSubmitState("rate_limited");
        return;
      }

      setSubmitState("error");
    } catch {
      setSubmitState("error");
    }
  };

  const clearFeedback = (): void => {
    if (
      submitState === "success" ||
      submitState === "error" ||
      submitState === "validation_error" ||
      submitState === "phone_invalid" ||
      submitState === "name_invalid" ||
      submitState === "email_invalid" ||
      submitState === "message_invalid" ||
      submitState === "rate_limited"
    ) {
      setSubmitState("idle");
    }
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        {translations.form_title}
      </h2>
      <form
        noValidate
        onSubmit={handleSubmit}
        onInput={clearFeedback}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {translations.form_name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              aria-invalid={submitState === "name_invalid"}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                submitState === "name_invalid"
                  ? "border-red-400 focus:ring-red-200"
                  : "border-border"
              }`}
              placeholder={translations.form_placeholder_name}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-foreground mb-2"
            >
              {translations.form_phone}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={submitState === "phone_invalid"}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                submitState === "phone_invalid"
                  ? "border-red-400 focus:ring-red-200"
                  : "border-border"
              }`}
              placeholder={translations.form_placeholder_phone}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {translations.form_email}
          </label>
          <input
            type="text"
            id="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={submitState === "email_invalid"}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
              submitState === "email_invalid"
                ? "border-red-400 focus:ring-red-200"
                : "border-border"
            }`}
            placeholder={translations.form_placeholder_email}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {translations.form_subject}
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="">
              {translations.form_subject_placeholder}
            </option>
            <option value="residential">
              {translations.form_subject_options.residential}
            </option>
            <option value="commercial">
              {translations.form_subject_options.commercial}
            </option>
            <option value="renovation">
              {translations.form_subject_options.renovation}
            </option>
            <option value="consultation">
              {translations.form_subject_options.consultation}
            </option>
            <option value="other">
              {translations.form_subject_options.other}
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {translations.form_message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            aria-invalid={submitState === "message_invalid"}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none ${
              submitState === "message_invalid"
                ? "border-red-400 focus:ring-red-200"
                : "border-border"
            }`}
            placeholder={translations.form_placeholder_message}
          />
        </div>

        {submitState === "success" ? (
          <p
            role="status"
            className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground"
          >
            {translations.form_success}
          </p>
        ) : null}

        {submitState === "error" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {translations.form_error}
          </p>
        ) : null}

        {submitState === "validation_error" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {translations.form_error_validation}
          </p>
        ) : null}

        {submitState === "name_invalid" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {translations.form_name_invalid}
          </p>
        ) : null}

        {submitState === "email_invalid" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {translations.form_email_invalid}
          </p>
        ) : null}

        {submitState === "phone_invalid" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {translations.form_phone_invalid}
          </p>
        ) : null}

        {submitState === "message_invalid" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {translations.form_message_invalid}
          </p>
        ) : null}

        {submitState === "rate_limited" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {translations.form_rate_limited}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={submitState === "loading"}
        >
          <Send className="mr-2 h-5 w-5" />
          {submitState === "loading"
            ? translations.form_sending
            : translations.form_submit}
        </Button>
      </form>
    </Card>
  );
}

