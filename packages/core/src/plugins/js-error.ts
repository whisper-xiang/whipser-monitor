import { EventTypes } from "../types/constant";

interface CollectedType {
  category: EventTypes;
  data: ErrorEvent;
}

interface ResourceTarget {
  src?: string;
  href?: string;
  localName?: string;
}

export const jsErrorPlugin = (options: any) => {
  return {
    name: "jsErrorPlugin",
    monitor(emit: (data: CollectedType) => void) {
      window.addEventListener(
        "error",
        (e: ErrorEvent) => {
          // e.preventDefault();
          emit({
            category: EventTypes.ERROR,
            data: e,
          });
        },
        true
      );
    },
    transform(collectedData: CollectedType) {
      console.log("监控到了js错误", collectedData);

      const { category, data } = collectedData;
      const { localName, src, href } = (data.target as ResourceTarget) || {};

      // 资源加载错误
      if (localName) {
        const resourceData = {
          source: localName,
          href: src || href,
        };
        // 上报用户行为栈
        this.breadcrumb.unshift({});
        return {};
      }
      // 脚本错误
      const { message: msg, error } = data;
      this.breadcrumb.unshift({
        // t: this.getTime(),
      });
    },
  };
};
