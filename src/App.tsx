import { defineComponent } from 'vue';
import Button from './components/button/demo';
import ConfigProvider from './components/config-provider';
import { RouterView } from 'vue-router';
const ComponentsShow = () => {
  return (
    <div>
      <div
        style={{
          padding: '10px'
        }}
      >
        <h1>button组件</h1>
        <Button></Button>
        <hr />
      </div>
    </div>
  );
};
export const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ConfigProvider>
        <ComponentsShow></ComponentsShow>
        <RouterView></RouterView>
      </ConfigProvider>
    );
  }
});
