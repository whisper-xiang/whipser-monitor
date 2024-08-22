export interface Plugin {
  name: string;
  monitor: (emit: (data: any) => void) => void;
  transform: (collectedData: any) => any;
  [key: string]: any;
}

export interface CoreOptions {
  reportOptions: {
    url: string; // 上报接口配置信息
    method: "xhr" | "fetch" | "beacon"; // 上报方式，可选值：'xhr' | 'fetch' | 'beacon'
    headers?: { [key: string]: string }; // 请求头信息
    payloadType?: "json" | "form"; // 请求体格式，可选值：'json' | 'form'
  };
  codeErrorOptions?: {
    /** 错误栈深度 */
    stkLimit?: number;
  };
  ListenError?: boolean; // 是否监听 error 事件
  maxBreadcrumbs?: number; // 面包屑最大层级
  plugins?: Plugin[];
}
