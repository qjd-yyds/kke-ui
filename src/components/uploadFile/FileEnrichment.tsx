import instance from '@/api/instance';
import { defineComponent, onMounted, ref } from 'vue';
import Button from '../button';
import Md5 from 'spark-md5';

export default defineComponent({
  name: 'FileSingle',
  setup() {
    const fileIpt = ref<HTMLInputElement>();
    const chooseFile = () => {
      fileIpt.value.click();
    };
    let _file = ref<File>(null);
    const localImg = ref<string>(null);
    const proValue = ref(0);
    const changeFileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        // 转成base64
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = ev => {
          // 读取base64
          const base64 = ev.target.result as string;
          resolve(base64);
        };
      });
    };
    const changeFileToBuffer = (file: File): Promise<ArrayBuffer> => {
      return new Promise((resolve, reject) => {
        // 转成base64
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = ev => {
          // 读取base64
          const buffer = ev.target.result as ArrayBuffer;
          resolve(buffer);
        };
      });
    };
    const changeIpt = async function (e: any) {
      const file = e.target.files[0];
      if (!file) return;
      // if (file.size > 2 * 1024 * 1024) {
      //   alert('文件大小不能超过2M');
      // }
      _file.value = file;
      localImg.value = await changeFileToBase64(file);
      const buffer = await changeFileToBuffer(file);
      const speak = new Md5.ArrayBuffer();
      speak.append(buffer);
      const Hash = speak.end();
      const formData = new FormData();
      const suffix = /\.([a-zA-Z0-9]+)$/.exec(_file.value.name)[1];
      formData.append('file', _file.value);
      formData.append('filename', Hash + '.' + suffix);
      instance
        .post('/upload_single_name', formData, {
          onUploadProgress(ev) {
            proValue.value = ev.loaded / ev.total;
            console.log(proValue.value);
            console.log(ev);
            console.log("======");
          }
        })
        .then(res => {
          console.log(res);
        })
        .then(() => {
          _file.value = null;
        });
    };
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
        <div>
          <span>文件名：{_file.value?.name}</span>
          <span>文件大小：{_file.value?.size}</span>
        </div>
        <div>
          <div>预览</div>
          {localImg.value && (
            <img
              style={{
                width: '200px'
              }}
              src={localImg.value}
              alt=""
            />
          )}
        </div>
        <div>
          <div>进度</div>
          <progress value={proValue.value} max={1}></progress>
        </div>
      </section>
    );
  }
});
