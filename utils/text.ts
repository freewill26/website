/** Splits off the final word of a heading so it can be re-rendered in an accent color. */
export function splitLastWord(text: string): [string, string] {
  const i = text.lastIndexOf(" ");
  return i === -1 ? ["", text] : [text.slice(0, i), text.slice(i + 1)];
}
