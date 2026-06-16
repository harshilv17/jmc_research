/** Minimal className joiner — drops falsy values. No dependency needed. */
export function clsx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
