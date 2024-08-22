import { EventTypes } from "../types/constant";
import { CoreOptions } from "../types/core";
import { Breadcrumb } from "./breadcrumb";

interface ReportData {
  type: EventTypes;
  timestamp: number;
  error?: string;
  component?: string;
  info?: string;
  [key: string]: any;
}

type ReportOptions = CoreOptions["reportOptions"];
export class Tracker {
  private options: ReportOptions;
  private breadcrumb: Breadcrumb;

  constructor(options: CoreOptions, breadcrumb: Breadcrumb) {
    this.options = options.reportOptions;
    this.breadcrumb = breadcrumb;
  }

  // 上报数据
  public report(
    data: ReportData,
    options?: Partial<ReportOptions>
  ): Promise<any> {
    const reportOptions = { ...this.options, ...options };

    const reportData = this.attach(data); // 附加数据
    switch (reportOptions.method) {
      case "fetch":
        return this.reportWithFetch(reportData, reportOptions as ReportOptions);
      case "beacon":
        return this.reportWithBeacon(
          reportData,
          reportOptions as ReportOptions
        );
      case "xhr":
      default:
        return this.reportWithXHR(reportData, reportOptions as ReportOptions);
    }
  }

  // 使用 XHR 方式上报
  private reportWithXHR(data: ReportData, options: ReportOptions) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", options.url, true);
      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.setRequestHeader(
        "Content-Type",
        options.payloadType === "json"
          ? "application/json"
          : "application/x-www-form-urlencoded"
      );

      console.log("Report data:", data);

      xhr.send(
        options.payloadType === "json"
          ? JSON.stringify(data)
          : this.toFormData(data)
      );

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => {
        reject(xhr.statusText);
      };
    });
  }

  // 使用 Fetch API 方式上报
  private reportWithFetch(data: ReportData, options: ReportOptions) {
    return fetch(options.url, {
      method: "POST",
      headers: {
        ...options.headers,
        "Content-Type":
          options.payloadType === "json"
            ? "application/json"
            : "application/x-www-form-urlencoded",
      },
      body:
        options.payloadType === "json"
          ? JSON.stringify(data)
          : this.toFormData(data),
    }).catch((error) => {
      console.error("Fetch report failed:", error);
    });
  }

  // 使用 Beacon API 方式上报
  private reportWithBeacon(data: ReportData, options: ReportOptions) {
    return new Promise((resolve) => {
      const payload =
        options.payloadType === "json"
          ? JSON.stringify(data)
          : this.toFormData(data);
      const result = navigator.sendBeacon(options.url, payload);
      resolve(result);
    });
  }

  // 将数据转换为 URL 编码的表单数据格式
  private toFormData(data: ReportData): string {
    return Object.entries(data)
      .map(
        ([key, value]) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(String(value))
      )
      .join("&");
  }

  // 附件数据
  public attach(data: ReportData, options?: Partial<ReportOptions>) {
    const excludeBreadcrumb = [
      EventTypes.PERFORMANCE,
      EventTypes.RECORD,
      EventTypes.WHITE_SCREEN,
    ];
    if (!excludeBreadcrumb.includes(data.type)) {
      data.breadcrumb = this.breadcrumb.getStack(); // 获取用户行为栈
    }
    data.timestamp = Date.now(); // 记录时间戳
    return data;
  }
}
