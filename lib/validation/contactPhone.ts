/**
 * Azerbaijani mobile numbers: +994 XX XXX XX XX or local 0XX XXX XX XX.
 * Operator codes per common mobile ranges (10, 12, 18, 50, 51, 55, 60, 61, 70, 77, 99).
 */
const AZ_MOBILE_AFTER_PREFIX = /^(?:10|12|18|50|51|55|60|61|70|77|99)\d{7}$/;

export function isValidAzerbaijanContactPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("994")) {
    return AZ_MOBILE_AFTER_PREFIX.test(digits.slice(3));
  }
  if (digits.length === 10 && digits.startsWith("0")) {
    return AZ_MOBILE_AFTER_PREFIX.test(digits.slice(1));
  }
  return false;
}
