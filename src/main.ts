import { createApp } from 'vue';
import { App } from './App';
import { setupRouter } from './router';
import './components/style';
const app = createApp(App);
// 注册路由
setupRouter(app);
app.mount('#app');
