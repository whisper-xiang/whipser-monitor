// userBehaviorStack.ts

interface UserBehavior {
  timestamp: number;
  eventType: string;
  data: any;
}

class UserBehaviorStack {
  private stack: UserBehavior[];

  constructor() {
    this.stack = [];
  }

  // 添加一个新的用户行为到栈中
  public push(eventType: string, data: any) {
    const behavior: UserBehavior = {
      timestamp: Date.now(),
      eventType,
      data,
    };

    this.stack.push(behavior);
    console.log("User behavior pushed:", behavior);
  }

  // 清空用户行为栈
  public clear() {
    this.stack = [];
    console.log("User behavior stack cleared");
  }

  // 获取当前行为栈的内容
  public getStack() {
    return this.stack;
  }

  // 获取行为栈的大小
  public getSize() {
    return this.stack.length;
  }
}

export const userBehaviorStack = new UserBehaviorStack();
