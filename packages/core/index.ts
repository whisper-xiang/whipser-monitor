import { Breadcrumb, EventBus, Tracker, Options } from "./src/core";
import { Plugin, CoreOptions, EventTypes } from "@whisper/types";
import { isValidPlugin } from "@whisper/utils";

import { jsErrorPlugin, XHRPlugin } from "./src/plugins";

export class Core {
  private readonly options: CoreOptions;
  private readonly breadcrumb: Breadcrumb;
  public readonly tracker: Tracker;

  [key: string]: any;

  constructor(options: CoreOptions) {
    this.options = new Options(options);
    this.breadcrumb = new Breadcrumb(this.options);
    this.tracker = new Tracker(this.options, this.breadcrumb);
  }

  use(plugins: Plugin[]) {
    const eventBus = new EventBus();

    for (const plugin of plugins) {
      const { name: pluginName, monitor, transform } = plugin || {};

      // 验证插件的有效性
      if (!isValidPlugin(pluginName, monitor, transform)) {
        console.error(`The plugin name [${name}] is invalid, please check it.`);
        continue;
      }

      this[pluginName] = plugin;

      try {
        monitor.call(this, eventBus.emit.bind(eventBus, pluginName));
      } catch (error) {
        console.error(
          `The plugin [${pluginName}] encountered an error: ${error.message}`
        );
        continue;
      }

      const callback = (...args: any[]) => {
        const pluginData = transform.apply(this, args);
        this.tracker.report(pluginData).then(() => {
          console.log("上报成功");
        });
      };

      eventBus.on(pluginName, callback);
    }
  }
}
// 导出 init 方法
const init = (options: CoreOptions) => {
  const client = new Core(options);
  const { plugins = [] } = options;

  const allPlugins = [jsErrorPlugin, XHRPlugin.call(client), ...plugins];
  client.use(allPlugins);
  return client;
};

// 如果通过 install 方式安装，则作为 Vue 插件引入
const install = (Vue: any, options: CoreOptions) => {
  const client = init(options);

  const originalErrorHandler = Vue.config.errorHandler;

  Vue.config.errorHandler = (err: Error, vm: any, info: string) => {
    const errData = client.jsErrorPlugin.transform.call(client, {
      type: EventTypes.ERROR,
      data: {
        error: err,
      },
    });
    client.tracker.report(errData);

    if (originalErrorHandler) {
      originalErrorHandler.call(this, err, vm, info);
    }
  };
};

export default {
  install,
  init,
};
