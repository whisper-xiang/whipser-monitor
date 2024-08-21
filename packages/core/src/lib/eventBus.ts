export type UnknownFunc = (...args: unknown[]) => void;

/**
 * 发布订阅类
 *
 * @export
 * @class EventBus
 * @template T 事件枚举
 */
export class EventBus {
  events: Map<string, UnknownFunc[]> = new Map();
  on(eventName: string, callBack: (data: any) => any) {
    const fns = this.events.get(eventName);
    if (fns) {
      this.events.set(eventName, fns.concat(callBack));
      return;
    }
    this.events.set(eventName, [callBack]);
  }
  emit<D = any>(eventName: string, data: D) {
    const fns = this.events.get(eventName);
    if (!eventName || !fns) return;
    fns.forEach((fn) => {
      try {
        fn(data);
      } catch (err) {
        console.error(err);
      }
    });
  }
}
