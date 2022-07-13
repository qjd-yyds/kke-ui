import { defineComponent } from 'vue';
import { array } from 'vue-types';
export default defineComponent({
  name: 'list',
  props: {
    dataSource: array<{ id: number; name: string }>().def([])
  },
  setup(props) {
    return () => (
      <div>
        <ul>
          {props.dataSource.map((item, index) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
});
