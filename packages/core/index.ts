import { Breadcrumb, eventBus, Tracker, Options } from "./src/core";
import { Plugin, CoreOptions, EventTypes } from "@whisper/types";
import { isValidPlugin } from "@whisper/utils";

export class Core {
  private readonly breadcrumb: Breadcrumb;
  public readonly tracker: Tracker;
  public readonly options: CoreOptions;

  constructor(options: CoreOptions) {
    this.options = new Options(options);
    this.breadcrumb = new Breadcrumb(this.options);
    this.tracker = new Tracker(this.options, this.breadcrumb);
  }

  public use(plugins: Plugin[]) {
    for (const plugin of plugins) {
      const { name: pluginName, observer, watcher } = plugin || {};

      // 验证插件的有效性
      if (!isValidPlugin(pluginName, observer, watcher)) {
        console.error(
          `The plugin name [${pluginName}] is invalid, please check it.`
        );
        continue;
      }

      try {
        observer.call(this, eventBus.emit.bind(eventBus, pluginName));
      } catch (error) {
        console.error(
          `The plugin [${pluginName}] encountered an error: ${error.message}`
        );
        continue;
      }

      const callback = (...args: any[]) => {
        const pluginData = watcher.apply(this, args);
        if (!pluginData) {
          return;
        }
        this.tracker.report(pluginData).then(() => {
          console.log("上报成功", this.breadcrumb);
        });
      };

      eventBus.on(pluginName, callback);
    }
  }
}
// 导出 init 方法，作为使用入口
const init = (options: CoreOptions) => {
  const client = new Core(options);
  const { plugins = [] } = client.options;

  client.use(plugins);
};

// 如果通过 install 方式安装，则作为 Vue 插件引入
const install = (Vue: any, options: CoreOptions) => {
  // 1. 初始化core，注册所有插件
  init(options);

  const originalErrorHandler = Vue.config.errorHandler;

  Vue.config.errorHandler = (err: Error, vm: any, info: string) => {
    eventBus.emit("jsErrorPlugin", { type: EventTypes.ERROR, data: err });

    if (originalErrorHandler) {
      originalErrorHandler.call(this, err, vm, info);
    }
  };
};

export default {
  install,
  init,
};
