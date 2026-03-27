const MIN_LEN = 2;
const MAX_LEN = 200;

/** Unicode letters, spaces, apostrophe, period, hyphen between parts (e.g. O'Brien, Mary-Jane). */
const NAME_PATTERN = /^[\p{L}][\p{L}\s'.-]*$/u;

export function isValidContactName(name: string): boolean {
  const t = name.trim();
  if (t.length < MIN_LEN || t.length > MAX_LEN) {
    return false;
  }
  if (/\d/.test(t)) {
    return false;
  }
  return NAME_PATTERN.test(t);
}
