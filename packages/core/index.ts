import {
  VueInstance,
  CoreOptions,
  PluginOptions,
  InstallablePlugin,
  InstallablePluginInstance,
} from "@whisper/types";
import optionsManager from "./src/optionsManager";
import eventManager from "./src/eventManager";
import { handleJSErrorEvent } from "./src/eventManager/handlers";
import { eventBus } from "@whisper/utils";

// 如果通过install方式安装，则意味着是作为vue插件引入，否则直接调用init使用
const install = (Vue: VueInstance, options: CoreOptions) => {
  const originalErrorHandler = Vue.config.errorHandler;
  Vue.config.errorHandler = (err: Error, vm: VueInstance, info: string) => {
    handleJSErrorEvent(err);

    originalErrorHandler && originalErrorHandler.call(this, err, vm, info);
  };

  init(options);
};

const init = (options?: CoreOptions) => {
  // 初始化配置
  optionsManager.init(options);
  // 事件劫持
  eventManager.registerEventWatchers();
};

// 插件插槽
const use = (Plugin: InstallablePlugin, options?: PluginOptions): void => {
  const instance: InstallablePluginInstance = new Plugin(options || {});
  instance.type && eventBus.subscribe(instance.type, instance.handleEvent);
  instance.install(optionsManager.getOptions());
};

export default {
  install,
  init,
  use,
};
