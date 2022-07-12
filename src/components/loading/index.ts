import type { App, Plugin } from 'vue';
import PacManLoading from './PacManLoading';
PacManLoading.install = function (app: App) {
  app.component(PacManLoading.name, PacManLoading);
  return app;
};

export default PacManLoading as typeof PacManLoading & Plugin;
