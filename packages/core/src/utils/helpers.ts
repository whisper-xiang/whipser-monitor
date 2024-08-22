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
