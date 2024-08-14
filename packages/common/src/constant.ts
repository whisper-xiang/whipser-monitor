export enum MonitoringEventType {
  // HTTP 相关事件
  XHR = "xhr",
  FETCH = "fetch",

  // 用户交互事件
  CLICK = "click",
  DOM = "dom",

  // 错误相关事件
  ERROR = "error",
  UNHANDLED_REJECTION = "unhandledrejection",

  // 路由相关事件
  HISTORY = "history",
  HASHCHANGE = "hashchange",

  // 资源加载事件
  RESOURCE = "resource",

  // 框架相关事件
  VUE = "vue",
  REACT = "react",

  // 自定义事件
  CUSTOM = "custom",

  // 性能相关事件
  PERFORMANCE = "performance",

  // 特殊监控事件
  RECORD_SCREEN = "recordScreen",
  WHITE_SCREEN = "whiteScreen",
}
