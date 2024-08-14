// eventBus.ts

type Callback = (data: any) => void;

class EventBus {
  private events: Map<string, Callback[]> = new Map();

  // 订阅事件
  public subscribe(eventType: string, callback: Callback) {
    if (!this.events.has(eventType)) {
      this.events.set(eventType, []);
    }
    this.events.get(eventType)!.push(callback);
  }

  // 取消订阅事件
  public unsubscribe(eventType: string, callback: Callback) {
    if (!this.events.has(eventType)) return;
    const callbackArray = this.events.get(eventType)!;
    this.events.set(
      eventType,
      callbackArray.filter((cb) => cb !== callback)
    );
  }

  // 发布事件
  public publish(eventType: string, data: any) {
    if (!this.events.has(eventType)) return;
    const callbackArray = this.events.get(eventType)!;
    callbackArray.forEach((callback) => callback(data));
  }
}

export const eventBus = new EventBus();
