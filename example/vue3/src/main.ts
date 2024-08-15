import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import whisperCore from "../../../packages/core/index";
import screenRecord from "../../../packages/screenRecord/src/index";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

// app.config.errorHandler = (err, vm, info) => {
//   console.log(err, vm, info);
// };

whisperCore.use(screenRecord, {});
app
  .use(whisperCore, {
    dsn: "http://localhost:8090",
  })
  .use(ElementPlus)
  .mount("#app");
