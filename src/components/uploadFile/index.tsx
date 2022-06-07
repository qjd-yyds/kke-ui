import useConfigInject from '@/utils/hooks/useConfigInject';
import { defineComponent } from 'vue';
import FileEnrichment from './FileEnrichment';
import FileSingle from './FileSingle';
import FileSingleBase from './FileSingleBase';
export default defineComponent({
  name: 'UploadFile',
  setup(props) {
    const { prefixCls } = useConfigInject('UploadFile', props);
    return () => (
      <>
        <FileSingle></FileSingle>
        <hr />
        <FileSingleBase></FileSingleBase>
        <hr />
        <FileEnrichment></FileEnrichment>
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
