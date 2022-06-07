import instance from '@/api/instance';
import { defineComponent, onMounted, ref } from 'vue';
import Button from '../button';

export default defineComponent({
  name: 'FileSingle',
  setup() {
    const fileIpt = ref<HTMLInputElement>();
    const chooseFile = () => {
      fileIpt.value.click();
    };
    let _file = ref<File>(null);
    const upload = () => {
      if (_file.value) {
        const formData = new FormData();
        formData.append('file', _file.value);
        formData.append('filename', _file.value.name);
        instance
          .post('/upload_single', formData)
          .then(res => {
            console.log(res);
          })
          .then(() => {
            _file.value = null;
          });
      }
    };
    const changeIpt = function(e:any) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert('文件大小不能超过2M');
      }
      _file.value = file;
    }
    return () => (
      <section>
        <div>单文件上传formData</div>
        <input
          type="file"
          ref={fileIpt}
          onChange={changeIpt}
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
        <Button type="success" onClick={upload}>
          上传到服务器
        </Button>
        <div>
          <span>文件名：{_file.value?.name}</span>
          <span>文件大小：{_file.value?.size}</span>
        </div>
      </section>
    );
  }
});
