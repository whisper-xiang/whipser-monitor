/**
 * 添加事件监听器
 * ../export
 * ../param {{ addEventListener: Function }} target
 * ../param {keyof TotalEventName} eventName
 * ../param {Function} handler
 * ../param {(boolean | Object)} options
 * ../returns
 */

export interface Callback {
  (...args: any[]): any;
}

export function on(
  target: any,
  eventName: string,
  handler: Callback,
  options = false
) {
  target.addEventListener(eventName, handler, options);
}

type Method = (...args: any[]) => any;

/**
 * 重写原有方法
 * ../export
 * ../param {{ [key: string]: any }} source
 * ../param {keyof T} name
 * ../param {(originalMethod: Method) => Method} replacement
 * ../param {boolean} isForced
 * ../returns
 */
export function overrideOriginal<T extends object>(
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
