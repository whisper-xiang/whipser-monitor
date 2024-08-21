export class Breadcrumb {
  private readonly maxBreadcrumbs: number;
  private stack = [];
  constructor(options) {
    this.maxBreadcrumbs = options.maxBreadcrumbs || 80;
    this.stack = [];
  }
  /**
   * 添加用户行为栈
   * @param {BreadcrumbPushData} data
   */
  unshift(data) {
    // if (!data.l) {
    //   data.l = BreadcrumbLevel.INFO;
    // }
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.pop();
    }
    this.stack.unshift(data);
    // this.stack.sort((a, b) => b.t - a.t);
    return this.stack;
  }

  private pop(): boolean {
    return this.stack.pop() !== undefined;
  }

  clear(): void {
    this.stack = [];
  }

  getStack() {
    return this.stack.slice(0);
  }
}
