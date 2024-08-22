import { validateOption } from "@whisper/utils";
import { Plugin, CoreOptions } from "../types/core";

export class Options {
  maxBreadcrumbs?: number = 100; // 默认最大回溯数
  plugins?: Plugin[] = []; // 插件列表
  reportOptions: CoreOptions["reportOptions"] = {
    url: "http://localhost:8090/reportData", // 上报接口地址
    method: "xhr", // 上报接口请求方法
    headers: {}, // 上报接口请求头
    payloadType: "json", // 上报接口请求体格式
  };
  codeErrorOptions?: CoreOptions["codeErrorOptions"] = {
    stkLimit: 3,
  };

  constructor(options: CoreOptions) {
    const { reportOptions, maxBreadcrumbs, plugins } = options;

    reportOptions && (this.reportOptions = reportOptions);

    if (validateOption(maxBreadcrumbs, "maxBreadcrumbs", "number")) {
      maxBreadcrumbs && (this.maxBreadcrumbs = maxBreadcrumbs);
    }

    if (validateOption(plugins, "plugins", "array")) {
      plugins?.length && (this.plugins = plugins);
    }
  }
}
