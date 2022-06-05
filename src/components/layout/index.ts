import type { App } from 'vue';
import { Header, Footer, Content } from './layout';
export default {
  install(app: App) {
    app.component(Header.name, Header);
    app.component(Footer.name, Footer);
    app.component(Content.name, Content);
    return app;
  }
};
