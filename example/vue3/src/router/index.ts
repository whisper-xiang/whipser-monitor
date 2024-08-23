// src/router/index.js
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Home from "../components/HelloWorld.vue";
import About from "../components/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  // 其他路由
];

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL), // 使用HTML5的history模式
  history: createWebHashHistory(), // 使用hash模式
  routes,
});

export default router;
