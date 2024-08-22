// unhandledrejection

function promiseErrorPlugin(client: any) {
  return {
    name: "promiseErrorPlugin",
    observer() {},
    watcher() {},
  };
}

export default promiseErrorPlugin;
