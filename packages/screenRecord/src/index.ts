import { record } from "rrweb";
import { MonitoringEventType } from "@whisper/common";
import rrwebPlayer from "rrweb-player";

export default class screenRecord {
  type: MonitoringEventType;
  constructor() {
    this.type = MonitoringEventType.RECORD_SCREEN;
  }

  install() {
    let events = [];

    // 开始记录
    const stopFn = record({
      emit(event) {
        // 将事件存储在数组中
        events.push(event);
      },
      recordCanvas: true,
    });

    setTimeout(() => {
      // 停止记录
      stopFn();
      // console.log(events);
      new rrwebPlayer({
        target: document.getElementById("revert"),
        props: {
          events,
          // UNSAFE_replayCanvas: true,
        },
      });
    }, 3000);
  }
}
