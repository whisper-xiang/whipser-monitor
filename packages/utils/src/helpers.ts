type Method = (...args: any[]) => any;

export function wrapMethod<T extends object>(
  source: T,
  name: keyof T,
  replacement: (originalMethod: Method) => Method,
  isForced: boolean = false
): void {
  if (isForced || name in source) {
    const originalMethod = source[name] as Method;

    if (typeof originalMethod === "function") {
      source[name] = replacement(originalMethod) as any;
    } else if (isForced) {
      // If isForced is true and the original method doesn't exist, add it with the replacement.
      source[name] = replacement(() => {}) as any;
    }
  } else if (isForced) {
    // If isForced is true and the method does not exist, add it with the replacement.
    source[name] = replacement(() => {}) as any;
  }
}

/**
 * 返回包含id、class、innerTextde字符串的标签
 * @param target html节点
 */
export function htmlElementAsString(target: HTMLElement): string {
  const tagName = target.tagName.toLowerCase();
  if (tagName === "body") {
    return "";
  }
  let classNames = target.classList.value;

  classNames = classNames !== "" ? ` class='${classNames}'` : "";
  const id = target.id ? ` id="${target.id}"` : "";
  const innerText = target.innerText;
  return `<${tagName}${id}${
    classNames !== "" ? classNames : ""
  }>${innerText}</${tagName}>`;
}

// 获取当前的时间戳
export function getTimestamp(): number {
  return Date.now();
}

// 获取当天的日期 2022-11-08
export function getYMDHMS(): string {
  const datetime = new Date();
  const year = datetime.getFullYear(),
    month = ("0" + (datetime.getMonth() + 1)).slice(-2),
    date = ("0" + datetime.getDate()).slice(-2);
  return `${year}-${month}-${date}`;
}

export function typeofAny(target: any): string {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}
export function toStringAny(target: any, type: string): boolean {
  return Object.prototype.toString.call(target) === type;
}

// 验证选项的类型
export function validateOption(
  target: any,
  targetName: string,
  expectType: string
): boolean {
  if (!target) return false;
  if (typeofAny(target) === expectType) return true;
  console.error(
    `web-see: ${targetName}期望传入${expectType}类型，目前是${typeofAny(
      target
    )}类型`
  );
  return false;
}
