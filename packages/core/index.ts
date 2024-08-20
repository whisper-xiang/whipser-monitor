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
import { userBehaviorStack } from "./src/userBehaviorStack";

// 如果通过install方式安装，则意味着是作为vue插件引入，否则直接调用init使用
const install = (Vue: VueInstance, options: CoreOptions) => {
  // Vue.config.globalProperties.$router.beforeEach((to, from, next) => {
  //   console.log("Routing from:", from.fullPath);
  //   console.log("Routing to:", to.fullPath);
  //   document.referrer && console.log("Referer:", document.referrer);
  //   // 记录 refer 信息
  //   next();
  // });

  const originalErrorHandler = Vue.config.errorHandler;
  Vue.config.errorHandler = (err: Error, vm: VueInstance, info: string) => {
    handleJSErrorEvent(err);
    originalErrorHandler && originalErrorHandler.call(this, err, vm, info);
  };
  init(options);
};

const init = (options?: CoreOptions) => {
  console.log("init core");

  // 初始化配置
  optionsManager.init(options);
  // 事件劫持
  eventManager.registerEventWatchers();
};

// 插件插槽
const use = (Plugin: InstallablePlugin, options?: PluginOptions): void => {
  const instance: InstallablePluginInstance = new Plugin(options || {});
  instance.type && eventBus.subscribe(instance.type, instance.handleEvent);

  const pluginParams = {
    options: optionsManager.getOptions(),
    userBehaviorStack,
  };
  instance.install(pluginParams);
};

export default {
  install,
  init,
  use,
};
