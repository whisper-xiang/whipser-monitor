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
  window.addEventListener(
    MonitoringEventType.UNHANDLED_REJECTION,
    (e) => eventBus.notify(MonitoringEventType.UNHANDLED_REJECTION, e),
    true
  );
};

export const registerXHRWatchers = () => {
  console.log("xhrWatchers");

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

  console.log("xhrWatchers", originalXhrProto);

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
