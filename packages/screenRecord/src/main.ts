import { record } from "rrweb";
import pako from "pako";
import { Base64 } from "js-base64";
import rrwebPlayer from "rrweb-player";

export function startRecord() {
  let events: any[] = [];
  record({
    emit(event, isCheckout) {
      if (isCheckout) {
        const data = event.data;
        const compressedData = zip(data);
        // 上传数据到服务器
        console.log(event, compressedData);

        new rrwebPlayer({
          target: document.getElementById("revert"),
          props: {
            events,
            // UNSAFE_replayCanvas: true,
          },
        });
        events = [];
      }
      events.push(event);
    },
    recordCanvas: true,
    // 默认每10s重新制作快照
    checkoutEveryNms: 10000,
  });
}

// •	DOM Mutation（type: 0）: 包含节点的添加、移除、属性更改等信息。
// •	Mouse Move（type: 1）: 包含鼠标在屏幕上的位置、移动路径等信息。
// •	Mouse Interaction（type: 2）: 包含鼠标点击、双击、右键等交互信息。
// •	Input（type: 3）: 包含用户在输入框中的输入内容变化。
// •	Viewport Resize（type: 4）: 包含页面视口的宽高变化。
// •	Full Snapshot（type: 5）: 包含整个页面的完整快照，包括HTML结构和样式。
// •	Incremental Snapshot（type: 6）: 包含自上次快照后的增量变化。

// 压缩
export function zip(data: any): string {
  if (!data) return data;
  // 判断数据是否需要转为JSON
  const dataJson =
    typeof data !== "string" && typeof data !== "number"
      ? JSON.stringify(data)
      : data;
  // 使用Base64.encode处理字符编码，兼容中文
  const str = Base64.encode(dataJson as string);
  const binaryString = pako.gzip(str);
  const arr = Array.from(binaryString);
  let s = "";
  arr.forEach((item: any) => {
    s += String.fromCharCode(item);
  });
  return Base64.btoa(s);
}
