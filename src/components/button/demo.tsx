import type { CSSProperties } from 'vue';
import { defineComponent, Fragment } from 'vue';
import Button from '.';
import message from '@/components/message';

export default defineComponent({
  name: 'ButtonDemo',
  setup(props) {
    const ml: CSSProperties = {
      margin: '0 10px'
    };
    const info = () => {
      message.open({
        content: '大家好',
        onClose: () => {
          console.log('关闭message，触发的回调函数');
        }
      });
    };
    return () => (
      <Fragment>
        <Button type="primary" style={ml} onClick={info}>
          primary
        </Button>
        <Button style={ml}>default</Button>
        <Button type="success" style={ml}>
          success
        </Button>
        <Button type="danger" style={ml}>
          danger
        </Button>
        <Button type="danger" disabled style={ml}>
          disabled
        </Button>
        <Button type="info" style={ml}>
          info
        </Button>
        <Button type="warning" style={ml}>
          warning
        </Button>
        <hr />
        <Button type="primary" size="middle" style={ml}>
          middle
        </Button>
        <Button type="primary" size="large" style={ml}>
          large
        </Button>
        <Button type="primary" size="small" style={ml}>
          small
        </Button>
      </Fragment>
    );
  }
});
