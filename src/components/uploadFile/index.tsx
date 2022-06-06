import useConfigInject from '@/utils/hooks/useConfigInject';
import { defineComponent, onMounted, ref } from 'vue';
import Button from '../button';
function FileContainer() {}
export default defineComponent({
  name: 'UploadFile',
  setup(props) {
    const { prefixCls } = useConfigInject('UploadFile', props);
    const fileIpt = ref<HTMLInputElement>();
    const chooseFile = () => {
      fileIpt.value.click();
    };
    onMounted(() => {
      fileIpt.value.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
          alert('文件大小不能超过2M');
        }
        console.log(file);
      });
    });
    return () => (
      <>
        <section>
          <div>单文件上传formData</div>
          <input
            type="file"
            ref={fileIpt}
            style={{
              display: 'none'
            }}
          />
          <Button
            type="primary"
            onClick={chooseFile}
            style={{
              margin: '0px 10px'
            }}
          >
            选择文件
          </Button>
          <Button type="success">上传到服务器</Button>
        </section>
        <hr />
        <section>单文件上传base64-只能上传图片</section>
        <hr />
        <section>单文件上传浓缩图处理</section>
        <hr />
        <section>单文件上传进度管理</section>
        <hr />
        <section>多文件上传</section>
        <hr />
        <section>拖拽上传</section>
        <hr />
        <section>大文件上传</section>
      </>
    );
  }
});
