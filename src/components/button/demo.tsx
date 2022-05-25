import Button from '.';
import { defineComponent, Fragment, CSSProperties } from 'vue';

export default defineComponent({
  name: 'ButtonDemo',
  setup() {
    const ml: CSSProperties = {
      margin: '0 10px'
    };
    return () => (
      <Fragment>
        <Button type="primary" style={ml}>
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