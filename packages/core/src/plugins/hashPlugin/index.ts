// hashchange

import { CollectedType, EventTypes } from "@whisper/types";
import { _global } from "@whisper/utils";

const hashPlugin = {
  name: "hashPlugin",
  observer(emit: (data: CollectedType) => void) {
    if (!window.addEventListener) return;

    _global.addEventListener("hashchange", function (e: HashChangeEvent): void {
      console.log("hashchange", e);

      const { oldURL: from, newURL: to } = e;
      if (from === to) {
        return;
      }
      emit({
        type: EventTypes.HASH,
        category: "hashchange",
        data: {
          from,
          to,
        },
      });
    });
  },
  watcher(collectedData: CollectedType) {
    return {
      ...collectedData,
    };
  },
};

export { hashPlugin };
