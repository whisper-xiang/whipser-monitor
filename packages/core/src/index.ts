/*
 * @Author: whisper-xiang
 * @Date: 2024-08-13 18:22:26
 * @LastEditors: whisper-xiang
 * @LastEditTime: 2024-08-14 14:04:35
 * @Description: Please enter the description of the file
 */

import { VueInstance, Options } from "@whisper/types";
import optionsManager from "./optionsManager";
import eventManager from "./eventManager";

const install = (Vue: VueInstance, options: Options) => {
  init(options);
};

const init = (options: Options) => {
  // 初始化配置
  optionsManager.init(options);
  // 事件劫持
  eventManager.registerEventWatchers();
};

const use = (plugin: any, option: any) => {
  const instance = new plugin(option);
  instance?.install({ options: optionsManager.getOptions() });
};

export default {
  init,
  install,
  use,
};
