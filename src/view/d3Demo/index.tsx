import {defineComponent} from 'vue';
import UploadFile from '@/components/uploadFile';
import mixins from './setupmixins'

const demo = defineComponent({
    name: 'index',
    mixins,
    setup() {
        return (_,c) => {
            console.log(_)
            return <div>
                <UploadFile></UploadFile>
            </div>
        }
    }
});
export default demo