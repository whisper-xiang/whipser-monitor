// errorWatcher.ts
import { eventBus } from "@whisper/utils";
import { MonitoringEventType } from "@whisper/common"; // 假设 MonitoringEventType 包含 ERROR 类型

export const registerErrorWatchers = () => {
  window.addEventListener(MonitoringEventType.ERROR, (e) =>
    eventBus.notify(MonitoringEventType.ERROR, e)
  );
  window.addEventListener(MonitoringEventType.UNHANDLED_REJECTION, (e) =>
    eventBus.notify(MonitoringEventType.UNHANDLED_REJECTION, e)
  );
};
