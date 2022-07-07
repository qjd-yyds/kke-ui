import { defineComponent } from 'vue';
import ConfigProvider from './components/config-provider';
import { RouterView } from 'vue-router';
export const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ConfigProvider>
        <RouterView></RouterView>
      </ConfigProvider>
    );
  }
});
