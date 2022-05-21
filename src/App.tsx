import { defineComponent } from 'vue';
import { Button } from './components/button/button';
export const App = defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <div>app</div>
        <Button type="primary">测试1</Button>
        <Button >测试2</Button>
        <Button type='danger'>测试2</Button>
        <Button type='danger' disabled>无法选择</Button>
      </div>
    );
  }
});
