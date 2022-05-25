import { defineComponent,ref } from 'vue';
import Button from './components/button/demo';
export const App = defineComponent({
  name: 'App',
  setup() {
    const test = ref<boolean>(false)
    return () => (
      <div>
        <div
          style={{
            padding: '10px'
          }}
        >
          <h1>button组件</h1>
          <Button></Button>
        </div>
      </div>
    );
  }
});
