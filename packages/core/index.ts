// 该文件是核心文件，负责初始化配置

import { VueInstance, Options } from "@whisper/types";
import optionsManager from "./src/optionsManager";
import eventManager from "./src/eventManager";
import { handleJSErrorEvent } from "./src/eventManager/handlers";
import { eventBus } from "@whisper/utils";

// 如果通过install方式安装，则意味着是作为vue插件引入，否则直接调用init使用
const install = (Vue: VueInstance, options: Options) => {
  const originalErrorHandler = Vue.config.errorHandler;
  Vue.config.errorHandler = (err: Error, vm: VueInstance, info: string) => {
    handleJSErrorEvent(err);

    originalErrorHandler && originalErrorHandler.call(this, err, vm, info);
  };

  init(options);
};

const init = (options: Options) => {
  // 初始化配置
  optionsManager.init(options);
  // 事件劫持
  eventManager.registerEventWatchers();
};

// 插件插槽
const use = (plugin: any, option: any) => {
  const instance = new plugin(option);
  eventBus.subscribe(instance.type, instance.handleEvent);
  instance?.install({ options: optionsManager.getOptions() });
};

export default {
  install,
  init,
  use,
};
