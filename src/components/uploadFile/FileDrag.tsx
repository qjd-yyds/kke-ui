import instance from '@/api/instance';
import { defineComponent, onMounted, ref } from 'vue';
import Button from '../button';
import Md5 from 'spark-md5';

export default defineComponent({
  name: 'FileDrag',
  setup() {
    const fileIpt = ref<HTMLInputElement>();
    return () => (
      <section>
        <div>拖拽上传</div>
        <Button
          type="primary"
          style={{
            margin: '0px 10px'
          }}
        >
          上传
        </Button>
      </section>
    );
  }
});
