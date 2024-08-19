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
