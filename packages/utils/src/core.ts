export function isValidPlugin(
  name: string | undefined,
  monitor: Function | undefined,
  transform: Function | undefined
): boolean {
  return !!(name && monitor && transform);
}
