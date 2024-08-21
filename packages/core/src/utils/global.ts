import { UAParser } from "ua-parser-js";
// 获取全局变量
export function getGlobal(): Window {
  return window as unknown as Window;
}

const uaResult = new UAParser().getResult();
const _global = getGlobal();
// const _support = getGlobalSupport();

// 获取设备信息
_global.deviceInfo = {
  browserVersion: uaResult.browser.version, // // 浏览器版本号 107.0.0.0
  browser: uaResult.browser.name, // 浏览器类型 Chrome
  osVersion: uaResult.os.version, // 操作系统 电脑系统 10
  os: uaResult.os.name, // Windows
  ua: uaResult.ua,
  device: uaResult.device.model ? uaResult.device.model : "Unknow",
  device_type: uaResult.device.type ? uaResult.device.type : "Pc",
};

export { _global };
