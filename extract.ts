export const extract = (
  text: string,
  regex: RegExp,
): Array<Record<string, string>> => {
  const match = text.match(regex)
  return match ? [match.groups ?? {}] : []
}
