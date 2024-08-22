import { EventTypes, ErrorTypes } from "@whisper/types";
import { parseStackFrames } from "./helpers";

interface CollectedType {
  type: EventTypes;
  data: ErrorEvent;
}

interface ResourceTarget {
  src?: string;
  href?: string;
  localName?: string;
}

export const jsErrorPlugin = (options?) => {
  return {
    name: "jsErrorPlugin",
    monitor(emit: (data: CollectedType) => void) {
      window.addEventListener(
        "error",
        (e: ErrorEvent) => {
          // preventDefault 会导致报错停止流转
          // e.preventDefault();
          emit({
            type: EventTypes.ERROR,
            data: e,
          });
        },
        true
      );
    },
    transform(collectedData: CollectedType) {
      const { stkLimit = 5 } = this.options?.codeErrorOptions;

      const { type, data } = collectedData;
      const { localName, src, href } = (data.target as ResourceTarget) || {};

      // 资源加载错误
      if (localName) {
        const resourceData = {
          source: localName,
          href: src || href,
        };
        // 上报用户行为栈
        this.breadcrumb.unshift({
          type: type,
          category: ErrorTypes.RESOURCE_ERROR,
          data: resourceData,
          msg: `Unable to load "${resourceData.href}"`,
          t: +new Date(),
        });
        return {
          type: type,
          category: ErrorTypes.RESOURCE_ERROR,
          message: `Unable to load "${resourceData.href}"`,
          resource: resourceData,
        };
      }
      // 脚本错误
      const { message: msg, error } = data;
      this.breadcrumb.unshift({
        type: type,
        message: msg,
        stack: error?.stack,
        resource: {
          source: localName,
          href: src || href,
        },
      });

      const frames = parseStackFrames(error, stkLimit);
      const stk = frames.map(
        ({ lineno: lin, colno: col, filename: file, functionName: fn }) => ({
          lin,
          col,
          file,
          fn,
        })
      );

      return {
        type: EventTypes.ERROR,
        message: msg,
        stack: stk,
        resource: {
          source: localName,
          href: src || href,
        },
      };
    },
  };
};
