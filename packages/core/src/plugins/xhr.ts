import { overrideOriginal } from "@whisper/utils";
import { EventTypes, ErrorTypes } from "../types/constant";

function XHRPlugin() {
  return {
    name: "XHRPlugin",
    monitor(emit: (data) => void) {
      if (!window.XMLHttpRequest) return;
      const originalXhrProto = XMLHttpRequest.prototype;

      overrideOriginal(originalXhrProto, "open", (originalOpen) => {
        return function (this: any, ...args: any[]) {
          this._xhr = {
            ...args,
          };
          return originalOpen.apply(this, args);
        };
      });

      overrideOriginal(originalXhrProto, "send", (originalSend) => {
        return function (this: any, ...args: any[]) {
          const _xhr = this._xhr;
          this.addEventListener("loadend", function (_this: any) {
            console.log(_this);
          });
          emit({
            type: EventTypes.XHR,
            data: _xhr,
          });
          return originalSend.apply(this, args);
        };
      });
    },
    transform(collectedData) {
      this.breadcrumb.unshift({
        bt: EventTypes.XHR,
        t: +new Date(),
      });

      return {
        t: this.getTime(),
        e: EventTypes.API,
        dat: {
          ...collectedData,
        },
      };
    },
  };
}

export default XHRPlugin;
