export function getResource(): PerformanceResourceTiming[] {
  const entries = performance.getEntriesByType("resource");
  // 过滤掉非静态资源的 fetch、 xmlhttprequest、beacon
  let list = entries.filter((entry) => {
    return (
      ["fetch", "xmlhttprequest", "beacon"].indexOf(entry.initiatorType) === -1
    );
  });

  if (list.length) {
    list = JSON.parse(JSON.stringify(list));
    list.forEach((entry: any) => {
      entry.isCache = isCache(entry);
    });
  }
  return list;
}

// 判断资料是否来自缓存
export function isCache(entry: PerformanceResourceTiming): boolean {
  return (
    entry.transferSize === 0 ||
    (entry.transferSize !== 0 && entry.encodedBodySize === 0)
  );
}
