// eventManager.ts

import { eventBus } from "../utils/eventBus";
import { MonitoringEventType } from "../utils/enum";
import {
  handleClickEvent,
  handleJSErrorEvent,
  handleXHRSuccessEvent,
  handleFetchEvent,
  handleHistoryEvent,
  handleHashChangeEvent,
  handleUnhandledRejectionEvent,
  handleResourceEvent,
  handleDOMEvent,
  handleVueEvent,
  handleReactEvent,
  handleCustomEvent,
  handlePerformanceEvent,
  handleRecordScreenEvent,
  handleWhiteScreenEvent,
} from "./eventHandlers";

// 事件处理函数的类型
type EventHandler = (data: any) => void;

// 定义一个接口来表示事件及其处理函数
interface EventConfig {
  type: MonitoringEventType;
  handler: EventHandler;
}
// 事件配置数组
const eventConfigs: EventConfig[] = [
  {
    type: MonitoringEventType.CLICK,
    handler: handleClickEvent,
  },
  {
    type: MonitoringEventType.ERROR,
    handler: handleJSErrorEvent,
  },
  {
    type: MonitoringEventType.XHR,
    handler: handleXHRSuccessEvent,
  },
  {
    type: MonitoringEventType.FETCH,
    handler: handleFetchEvent,
  },
  {
    type: MonitoringEventType.HISTORY,
    handler: handleHistoryEvent,
  },
  {
    type: MonitoringEventType.HASHCHANGE,
    handler: handleHashChangeEvent,
  },
  {
    type: MonitoringEventType.UNHANDLED_REJECTION,
    handler: handleUnhandledRejectionEvent,
  },
  {
    type: MonitoringEventType.RESOURCE,
    handler: handleResourceEvent,
  },
  {
    type: MonitoringEventType.DOM,
    handler: handleDOMEvent,
  },
  {
    type: MonitoringEventType.VUE,
    handler: handleVueEvent,
  },
  {
    type: MonitoringEventType.REACT,
    handler: handleReactEvent,
  },
  {
    type: MonitoringEventType.CUSTOM,
    handler: handleCustomEvent,
  },
  {
    type: MonitoringEventType.PERFORMANCE,
    handler: handlePerformanceEvent,
  },
  {
    type: MonitoringEventType.RECORD_SCREEN,
    handler: handleRecordScreenEvent,
  },
  {
    type: MonitoringEventType.WHITE_SCREEN,
    handler: handleWhiteScreenEvent,
  },
];

// 注册事件的函数
function registerEventWatchers() {
  eventConfigs.forEach((config) => {
    eventBus.subscribe(config.type, config.handler);
  });
}

export default {
  registerEventWatchers,
};
