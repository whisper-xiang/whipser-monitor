// unhandledrejection

function promiseErrorPlugin(client: any) {
  return {
    name: "promiseErrorPlugin",
    monitor() {},
    transform() {},
  };
}

export default promiseErrorPlugin;
