const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const path = require("path");
const serve = require("koa-static");

const app = new Koa();
const router = new Router();

// 导入并初始化监控 SDK
const whisperCore = require("/Users/yun/custom/monitor/whisper-monitor/packages/core/index.ts");

// whisperCore.init();

// 配置视图引擎
app.use(
  views(path.join(__dirname, "views"), {
    extension: "ejs",
  })
);

app.use(whisperCore);

// 静态文件服务
app.use(serve(path.join(__dirname, "../public")));

// 配置路由
router.get("/", async (ctx) => {
  await ctx.render("index", { msg: "Hello from Koa + EJS" });
});

app.use(router.routes()).use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
