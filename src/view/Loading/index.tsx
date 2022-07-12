import { defineComponent } from 'vue';
import Loading from '@/components/loading';
export default defineComponent({
  name: 'Loading',
  setup() {
    return () => (
      <div>
        <Loading></Loading>
      </div>
    );
  }
});
