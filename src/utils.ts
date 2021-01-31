// eslint-disable-next-line import/prefer-default-export
export function isEmptyString(string: string): boolean {
  return string.replaceAll(' ', '').length === 0;
}
