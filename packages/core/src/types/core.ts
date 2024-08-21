export interface Plugin {
  name: string;
  monitor: (emit: (data: any) => void) => void;
  transform: (collectedData: any) => any;
  [key: string]: any;
}

export interface CoreOptions {
  dsn: string; // 上报接口配置信息
  listenError?: boolean; // 是否监听 error 事件
  maxBreadcrumbs?: number; // 面包屑最大层级
  plugins?: Plugin[];
}
