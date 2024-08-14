import { Options } from "@whisper/types";

class OptionsManager {
  private options: Options = {
    dsn: "",
  };

  // 初始化方法，用于设置配置，可以传入多个配置对象
  init(initialOptions: Options): void {
    this.options = { ...this.options, ...initialOptions };
    console.log("Options initialized:", this.options);
  }

  // 获取当前配置的方法
  getOptions(): Options {
    return this.options;
  }

  // 单个设置选项
  setOption(key: string, value: any): void {
    this.options[key] = value;
  }

  // 批量设置选项
  setOptions(newOptions: Options): void {
    this.options = { ...this.options, ...newOptions };
  }

  // 获取单个选项
  getOption(key: string): any {
    return this.options[key];
  }
}

const optionsManager = new OptionsManager();
export default optionsManager;
