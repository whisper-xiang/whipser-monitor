// import { MonitoringEventType } from "@whisper/core";
// export interface CoreOptions {
//   dsn: string; // 上报的地址
//   listenPerformance?: boolean; // 是否添加页面性能指标
//   listenRecordScreen?: boolean; // 是否开启录屏
//   recordScreenTime?: number; // 单次录屏时长
//   listenWhiteScreen?: boolean; // 是否开启白屏检测
//   listenClick?: boolean; // 是否监听 click 事件
//   listenUnhandledrejection?: boolean; // 是否监控 unhandledrejection
//   listenError?: boolean; // 是否监听 error 事件
// }

// export interface VueInstance {
//   [key: string]: any;
// }

// export interface PluginOptions {
//   type?: MonitoringEventType;
//   [kay: string]: any;
// }

// // 定义一个接口，要求类具有 install 方法
// export interface InstallablePlugin {
//   new (options: PluginOptions): InstallablePluginInstance;
// }
// export interface InstallablePluginInstance {
//   install({ options }: { options: PluginOptions }): void;
//   type: string;
//   handleEvent(event: any): void;
// }

export * from "./core";
