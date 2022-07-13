import type { App, Plugin } from 'vue';
import { Pagination } from './pagination';
Pagination.install = function (app: App) {
  app.component(Pagination.name, Pagination);
  return app;
};

export default Pagination as typeof Pagination & Plugin;
