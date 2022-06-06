import { defineComponent } from 'vue';
import UploadFile from '@/components/uploadFile';
export default defineComponent({
  name: 'index',
  setup() {
    return () => (
      <div>
        <UploadFile></UploadFile>
      </div>
    );
  }
});
