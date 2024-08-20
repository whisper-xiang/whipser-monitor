import {
  loadWatcher,
  longTaskWatcher,
  vitalsWatcher,
  whiteScreenWatcher,
} from "./watchers";
import { PluginOptions } from "@whisper/types";

export default class Performance {
  constructor() {}

  initOptions(options: PluginOptions) {
    // TODO: 初始化配置
  }
  install({ options: PluginOptions }) {
    // this.initOptions(options);

    loadWatcher(); // 资源列表
    longTaskWatcher(); // 长任务
    vitalsWatcher(); //  FCP、FID、LCP、TTFB、CLS
    whiteScreenWatcher(); // 页面崩溃
  }
}
