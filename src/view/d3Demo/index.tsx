import { defineComponent } from 'vue';
import { Header } from '@/components/layout/layout';
export default defineComponent({
  name: 'index',
  setup() {
    return () => (
      <div>
        <Header>打算大</Header>
      </div>
    );
  }
});
