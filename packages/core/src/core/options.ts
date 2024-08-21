// import { CoreOptions } from "@whisper/types";
import { validateOption } from "@whisper/utils";
import { Plugin, CoreOptions } from "../types/core";

export class Options {
  dsn: string = ""; // 监控上报接口的默认地址
  maxBreadcrumbs?: number = 100; // 默认最大回溯数
  plugins: Plugin[]; // 插件列表

  constructor(options: CoreOptions) {
    const { dsn, maxBreadcrumbs, plugins } = options;

    // 只在值有效时覆盖默认值
    if (validateOption(dsn, "dsn", "string")) {
      this.dsn = dsn;
    }

    if (validateOption(maxBreadcrumbs, "maxBreadcrumbs", "number")) {
      maxBreadcrumbs && (this.maxBreadcrumbs = maxBreadcrumbs);
    }

    if (validateOption(plugins, "plugins", "array")) {
      plugins?.length && (this.plugins = plugins);
    }
  }
}
