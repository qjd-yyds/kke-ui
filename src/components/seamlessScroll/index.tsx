import { SeamlessScroll } from './seamlessScroll';
import type { App, Plugin } from 'vue';
const install = (app: App) => {
  app.component(SeamlessScroll.name, SeamlessScroll);
  return app;
};
SeamlessScroll.install = install;
export default SeamlessScroll as typeof SeamlessScroll & Plugin;
