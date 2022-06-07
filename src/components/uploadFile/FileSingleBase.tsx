import instance from '@/api/instance';
import { defineComponent, ref } from 'vue';
import Button from '../button';

export default defineComponent({
  name: 'FileSingleBase',
  setup() {
    const fileIpt = ref<HTMLInputElement>();
    const chooseFile = () => {
      fileIpt.value.click();
    };
    let _file = ref<File>(null);
    const changeFileToBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        // 转成base64
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ev => {
          // 读取base64
          const base64 = ev.target.result;
          resolve(base64);
        };
      });
    };
    const changeIpt = async function (e: any) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert('文件大小不能超过2M');
      }
      const base64 = await changeFileToBase64(file);
      instance
      .post(
        '/upload_single_base64',
        {
          file: base64,
          filename: encodeURIComponent(file.name)
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(res => {
        console.log(res);
      });
    };
    return () => (
      <section>
        <div>单文件上传base64-只能上传图片</div>
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
        <div>
          <span>文件名：{_file.value?.name}</span>
          <span>文件大小：{_file.value?.size}</span>
        </div>
      </section>
    );
  }
});
