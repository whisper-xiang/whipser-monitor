import { Breadcrumb } from "./breadcrumb";
import { EventBus } from "../lib/eventBus";
import { Tracker } from "./tracker";
import { Options } from "./options";
import { Plugin, CoreOptions } from "../types/core";
import { jsErrorPlugin } from "../plugins/js-error";

export class Core {
  private readonly options: Options; // 使用 Options 类型
  private readonly breadcrumb: Breadcrumb;
  public readonly tracker: Tracker;

  [key: string]: any;

  constructor(options: CoreOptions) {
    this.options = new Options(options);
    this.breadcrumb = new Breadcrumb(this.options);
    this.tracker = new Tracker(this.options);
  }

  use(plugins: Plugin[]) {
    const eventBus = new EventBus();

    for (const plugin of plugins) {
      const { name, monitor, transform } = plugin || {};

      // 验证插件的有效性
      if (!this.isValidPlugin(name, monitor, transform)) {
        console.error(`The plugin name [${name}] is invalid, please check it.`);
        continue;
      }

      this[name] = plugin;

      try {
        monitor.call(this, eventBus.emit.bind(eventBus, name));
      } catch (error) {
        console.error(
          `The plugin [${name}] encountered an error: ${error.message}`
        );
        continue;
      }

      const callback = (...args: any[]) => {
        const pluginData = transform.apply(this, args);
        // this.tracker.send(pluginData, this);
      };

      eventBus.on(name, callback);
    }
  }

  // 验证插件的有效性
  private isValidPlugin(
    name: string | undefined,
    monitor: Function | undefined,
    transform: Function | undefined
  ): boolean {
    return !!(name && monitor && transform);
  }
}

const init = (options: CoreOptions) => {
  const client = new Core(options);
  const { plugins = [] } = options;

  client.use([jsErrorPlugin.call(client, options), ...plugins]);
  return client;
};

// 安装方法，如果通过 install 方式安装，则作为 Vue 插件引入
const install = (Vue: any, options: CoreOptions) => {
  const client = init(options);

  const originalErrorHandler = Vue.config.errorHandler;

  // Vue.config.errorHandler = (err: Error, vm: any, info: string) => {
  //   // const errData = client.jsError.transform(err, vm, info);
  //   // client.tracker.send(errData, this);

  //   if (originalErrorHandler) {
  //     originalErrorHandler.call(this, err, vm, info);
  //   }
  // };
};

export default {
  install,
  init,
};
