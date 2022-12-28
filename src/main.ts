import { createApp } from "vue";
import { App } from "./App";
import { setupRouter } from "./router";
import "./components/style";

const app = createApp(App);
import ripple from "@/driecticve/ripple";
// 注册路由
setupRouter(app);
ripple(app);
app.mount("#app");
