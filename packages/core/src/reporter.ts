// reporter.ts
interface ReportData {
  type: string;
  timestamp: number;
  error?: string;
  component?: string;
  info?: string;
  [key: string]: any;
}

interface ReportOptions {
  method: "xhr" | "fetch" | "beacon";
  url: string;
  headers?: Record<string, string>;
  payloadType?: "json" | "form";
}

class Reporter {
  private defaultOptions: ReportOptions = {
    method: "xhr",
    url: "/report",
    payloadType: "json",
  };

  constructor(private options: Partial<ReportOptions> = {}) {
    this.options = { ...this.defaultOptions, ...options };
  }

  // 上报数据
  public report(data: ReportData, options?: Partial<ReportOptions>) {
    const reportOptions = { ...this.options, ...options };

    fetch("http://localhost:8090/reportData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.info("监控上报成功");
    });

    // switch (reportOptions.method) {
    //   case "fetch":
    //     this.reportWithFetch(data, reportOptions as ReportOptions);
    //     break;
    //   case "beacon":
    //     this.reportWithBeacon(data, reportOptions as ReportOptions);
    //     break;
    //   case "xhr":
    //   default:
    //     this.reportWithXHR(data, reportOptions as ReportOptions);
    //     break;
    // }
  }

  // 使用 XHR 方式上报
  private reportWithXHR(data: ReportData, options: ReportOptions) {
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

    xhr.send(
      options.payloadType === "json"
        ? JSON.stringify(data)
        : this.toFormData(data)
    );
  }

  // 使用 Fetch API 方式上报
  private reportWithFetch(data: ReportData, options: ReportOptions) {
    fetch(options.url, {
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
    const payload =
      options.payloadType === "json"
        ? JSON.stringify(data)
        : this.toFormData(data);
    navigator.sendBeacon(options.url, payload);
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
}

// 创建单例实例
const reporter = new Reporter({ url: "http://localhost:8090/reportData" });

export { reporter };
