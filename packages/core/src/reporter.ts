// reporter.ts

interface ReportData {
  type: string;
  timestamp: number;
  data: any;
}

class Reporter {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public report(data: ReportData) {
    // 使用 fetch 发送数据到服务器
    fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully reported data:", data);
      })
      .catch((error) => {
        console.error("Error reporting data:", error);
      });
  }
}

export const reporter = new Reporter("https://your-endpoint.com/report");
