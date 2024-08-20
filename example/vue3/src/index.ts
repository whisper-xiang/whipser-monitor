console.log("test");

window.addEventListener("popstate", () => {
  console.log("Popstate event detected!");
  // 这里捕获到 refer 信息
});

window.addEventListener("hashchange", () => {
  console.log("Hashchange event detected!");
  // 这里捕获到 refer 信息
});
