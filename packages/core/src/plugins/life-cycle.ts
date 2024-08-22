// 生命周期 load/unload

function lifeCyclePlugin() {
  return {
    name: "lifeCyclePlugin",
    monitor() {},
    transform() {},
  };
}

export default lifeCyclePlugin;
