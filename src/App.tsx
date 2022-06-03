import { defineComponent } from 'vue';
import Button from './components/button/demo';
import ConfigProvider from './components/config-provider';
export const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ConfigProvider>
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
      </ConfigProvider>
    );
  }
});
