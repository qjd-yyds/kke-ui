import { CSSProperties, defineComponent, reactive } from 'vue';
import SeamlessScroll from '@/components/seamlessScroll';
export default defineComponent({
  name: 'scrollShow',
  setup() {
    const style: CSSProperties = {
      display: 'inline-block',
      height: '110px',
      width: '390px',
      overflow: 'hidden',
      position: 'relative',
      background: '#000',
      color: '#fff'
    };
    const list = reactive([
      {
        name: '测试1',
        time: '2020-01-01'
      },
      {
        name: '测试2',
        time: '2020-01-02'
      },
      {
        name: '测试3',
        time: '2020-01-03'
      },
      {
        name: '测试4',
        time: '2020-01-04'
      },
      {
        name: '测试5',
        time: '2020-01-05'
      }
    ]);
    return () => (
      <div style={style}>
        <SeamlessScroll list={list}>
          {list.map(item => {
            return <div key={item.time}>{item.name}</div>;
          })}
        </SeamlessScroll>
      </div>
    );
  }
});
