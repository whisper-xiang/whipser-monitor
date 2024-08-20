// errorWatcher.ts
import { eventBus, wrapMethod } from "@whisper/utils";
import { MonitoringEventType } from "@whisper/common"; // 假设 MonitoringEventType 包含 ERROR 类型

export const registerErrorWatchers = () => {
  window.addEventListener(
    MonitoringEventType.ERROR,
    (e) => {
      eventBus.notify(MonitoringEventType.ERROR, e);
    },
    true
  );
};

export const registerXHRWatchers = () => {
  if (!window.XMLHttpRequest) return;
  const originalXhrProto = XMLHttpRequest.prototype;

  wrapMethod(originalXhrProto, "open", (originalOpen) => {
    return function (this: any, ...args: any[]) {
      this._xhr = {
        ...args,
      };
      return originalOpen.apply(this, args);
    };
  });

  wrapMethod(originalXhrProto, "send", (originalSend) => {
    return function (this: any, ...args: any[]) {
      const _xhr = this._xhr;
      this.addEventListener("loadend", function (_this: any) {
        console.log(_this);

        eventBus.notify(MonitoringEventType.XHR, _xhr);
      });
      return originalSend.apply(this, args);
    };
  });

  eventBus.notify(MonitoringEventType.XHR, "xhrWatchers");
};

export const registerClickWatchers = () => {
  if (!window.addEventListener) return;

  window.addEventListener(
    "click",
    function (this: any): void {
      eventBus.notify(MonitoringEventType.CLICK, this);
    },
    true
  );
};

export const unhandledrejection = () => {
  if (!window.addEventListener) return;

  window.addEventListener("unhandledrejection", function (e: any): void {
    eventBus.notify(MonitoringEventType.UNHANDLED_REJECTION, e); // 这里的类型是 any
  });
};

export const historyWatcher = () => {
  if (!window.history) return;
  const originalHistoryProto = window.history.constructor.prototype;
  wrapMethod(originalHistoryProto, "pushState", (originalPushState) => {
    return function (this: any, ...args: any[]) {
      eventBus.notify(MonitoringEventType.HISTORY, args);
      return originalPushState.apply(this, args);
    };
  });
  window.onpopstate = function (this: any): void {
    console.log("fffffffff");
  };
};

export const hashChangeWatchers = () => {
  window.onpopstate = function (this: any): void {
    console.log("fffffffff");
  };
  window.addEventListener("hashchange", function (this: any): void {
    console.log("handleHashChangeEventhandleHashChangeEvent");

    eventBus.notify(MonitoringEventType.HASHCHANGE, this);
  });
};

export const registerWatchers = [
  historyWatcher,
  hashChangeWatchers,
  unhandledrejection,
  registerErrorWatchers,
  registerXHRWatchers,
  registerClickWatchers,
];
