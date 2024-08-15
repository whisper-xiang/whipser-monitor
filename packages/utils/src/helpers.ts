type Method = (...args: any[]) => any;

export function wrapMethod<T extends object>(
  source: T,
  name: keyof T,
  replacement: (originalMethod: Method) => Method,
  isForced: boolean = false
): void {
  if (isForced || name in source) {
    const originalMethod = source[name] as Method;

    if (typeof originalMethod === "function") {
      source[name] = replacement(originalMethod) as any;
    } else if (isForced) {
      // If isForced is true and the original method doesn't exist, add it with the replacement.
      source[name] = replacement(() => {}) as any;
    }
  } else if (isForced) {
    // If isForced is true and the method does not exist, add it with the replacement.
    source[name] = replacement(() => {}) as any;
  }
}
