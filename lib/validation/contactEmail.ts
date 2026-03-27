const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidContactEmail(email: string): boolean {
  const t = email.trim();
  return t.length > 0 && t.length <= 254 && EMAIL_RE.test(t);
}
