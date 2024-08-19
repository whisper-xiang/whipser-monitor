import { getTimestamp } from "@whisper/utils";
import { getResource } from "./utils";

import { onLCP, onFID, onCLS, onFCP, onTTFB } from "web-vitals";

export const loadWatcher = () => {
  window.addEventListener("load", function () {
    // 上报资源列表
    // 上报内存情况, safari、firefox不支持该属性
    if (performance.memory) {
    }
  });
};

export const longTaskWatcher = () => {
  // 首先，定义一个类型来表示长任务的性能条目
  interface LongTaskEntry extends PerformanceEntry {
    entryType: "longtask";
    startTime: number;
    duration: number;
    name: string;
    attribution: any[]; // 长任务的详细归因信息
  }

  // 创建一个 PerformanceObserver 实例来监控 longtask 类型的性能条目
  const longTaskObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      const longTask = entry as LongTaskEntry;
      console.log(`Long task detected:`);
      console.log(`Start time: ${longTask.startTime}ms`);
      console.log(`Duration: ${longTask.duration}ms`);
      console.log(`Name: ${longTask.name}`);

      requestIdleCallback(() => {
        // 上报
        console.log(`Attribution:`, longTask.attribution);
      });
    });
  });

  // 开始观察 longtask 类型的性能条目
  longTaskObserver.observe({ type: "longtask", buffered: true });

  // 当不再需要监控时，可以停止观察
  // longTaskObserver.disconnect();
};

// 获取FCP、FID、LCP、TTFB、CLS 的性能条目
export const vitalsWatcher = () => {
  // chrome用web-vitals

  if (isChrome()) {
    onFCP((fcp) => {
      console.log(`First Contentful Paint: ${fcp.time}ms`);
    });

    onFID((fid) => {
      console.log(`First Input Delay: ${fid.time}ms`);
    });

    onLCP((lcp) => {
      console.log(`Largest Contentful Paint: ${lcp.time}ms`);
    });

    onTTFB((ttfb) => {
      console.log(`Time to First Byte: ${ttfb.time}ms`);
    });

    onCLS((cls) => {
      console.log(`Cumulative Layout Shift: ${cls}`);
    });
  }

  // 其他用自定义的
};

function isChrome() {
  return (
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  );
}

/**
 * 检测页面是否白屏
 */

export const whiteScreenWatcher = () => {};
