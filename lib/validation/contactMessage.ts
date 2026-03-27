const MAX_LEN = 5000;

export function isValidContactMessage(message: string): boolean {
  const t = message.trim();
  return t.length >= 1 && t.length <= MAX_LEN;
}
