import { reporter } from "../reporter";
// 点击事件的处理函数
export function handleClickEvent(data: any) {
  console.log("Click event captured:", data);
  // 在这里处理点击事件的具体逻辑
}

// JavaScript 错误事件的处理函数
export function handleJSErrorEvent(ev: any) {
  const target = ev.target;
  console.error("监控捕捉到了：JavaScript 错误事件", ev, target);
  reporter.report(ev);
}

// XHR 成功事件的处理函数
export function handleXHREvent(data: any) {
  console.log("监控捕捉到了：XHR  event captured:", data);
  // 在这里处理 XHR 成功事件的具体逻辑
}

// Fetch 事件的处理函数
export function handleFetchEvent(data: any) {
  console.log("Fetch event captured:", data);
  // 在这里处理 Fetch 请求的具体逻辑
}

// History 事件的处理函数
export function handleHistoryEvent(data: any) {
  console.log("History event captured:", data);
  // 在这里处理浏览器历史记录事件的具体逻辑
}

// HashChange 事件的处理函数
export function handleHashChangeEvent(data: any) {
  console.log("HashChange event captured:", data);
  // 在这里处理哈希变化事件的具体逻辑
}

// Unhandled Rejection 事件的处理函数
export function handleUnhandledRejectionEvent(data: any) {
  console.error("监控捕捉到了： Unhandled Rejection event captured :", data);
  // 在这里处理未处理的 Promise 拒绝事件的具体逻辑
}

// Resource 事件的处理函数
export function handleResourceEvent(data: any) {
  console.log("Resource event captured:", data);
  // 在这里处理资源加载事件的具体逻辑
}

// DOM 事件的处理函数
export function handleDOMEvent(data: any) {
  console.log("DOM event captured:", data);
  // 在这里处理 DOM 事件的具体逻辑
}

// Vue 事件的处理函数
export function handleVueEvent(data: any) {
  console.log("Vue event captured:", data);
  // 在这里处理 Vue 框架事件的具体逻辑
}

// React 事件的处理函数
export function handleReactEvent(data: any) {
  console.log("React event captured:", data);
  // 在这里处理 React 框架事件的具体逻辑
}

// Custom 事件的处理函数
export function handleCustomEvent(data: any) {
  console.log("Custom event captured:", data);
  // 在这里处理自定义事件的具体逻辑
}

// Performance 事件的处理函数
export function handlePerformanceEvent(data: any) {
  console.log("Performance event captured:", data);
  // 在这里处理性能事件的具体逻辑
}

// Record Screen 事件的处理函数
export function handleRecordScreenEvent(data: any) {
  console.log("Record Screen event captured:", data);
  // 在这里处理录制屏幕事件的具体逻辑
}

// White Screen 事件的处理函数
export function handleWhiteScreenEvent(data: any) {
  console.log("White Screen event captured:", data);
  // 在这里处理白屏事件的具体逻辑
}
