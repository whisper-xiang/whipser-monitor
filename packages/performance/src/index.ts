import {
  loadWatcher,
  longTaskWatcher,
  vitalsWatcher,
  whiteScreenWatcher,
} from "./watchers";
import { PluginOptions } from "@whisper/types";

export default class Performance {
  install(options: PluginOptions) {
    loadWatcher(); // 资源列表
    longTaskWatcher(); // 长任务
    vitalsWatcher(); //  FCP、FID、LCP、TTFB、CLS
    whiteScreenWatcher(); // 页面崩溃
  }
}
