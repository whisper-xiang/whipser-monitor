import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import screenRecord from "../../../packages/screenRecord/src/index";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import whisperCore from "../../../packages/core/src/core/index";
import plugin from "./plugins/MyPlugin";

const app = createApp(App);

// app.config.errorHandler = (err, vm, info) => {
//   console.log(err, vm, info);
// };

// whisperCore.use(screenRecord, {});

// app.use(whisperCore, {
//   dsn: "http://localhost:8090",
// });
app.use(router);
app.use(whisperCore, {
  reportOptions: {
    url: "http://localhost:8090/reportData", // 上报接口配置信息
    method: "xhr",
    payloadType: "json",
  },
});
app.use(plugin, { message: "Custom Plugin Initialized!" });
app.use(ElementPlus);
app.mount("#app");
