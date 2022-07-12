import { defineComponent } from 'vue';
import ConfigProvider from './components/config-provider';
import { RouterView } from 'vue-router';
import Demo from './components/button/demo';
export const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ConfigProvider>
        <Demo></Demo>
        <RouterView></RouterView>
      </ConfigProvider>
    );
  }
});
