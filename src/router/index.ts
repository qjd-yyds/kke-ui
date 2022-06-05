import { type App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
const router = createRouter({
  history: createWebHistory(),
  routes
});

function setupRouter(app: App) {
  app.use(router);
}

export { router, setupRouter, routes };
