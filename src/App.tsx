import { computed, defineComponent, reactive, ref } from 'vue';
import ConfigProvider from './components/config-provider';
import { RouterView } from 'vue-router';
import Pagination from './components/Pagination';
import List from './components/Pagination/list';
import { chunk } from './utils/utils';
export const App = defineComponent({
  name: 'App',
  setup() {
    const lists = reactive([
      { id: 1, name: 'Curtis' },
      { id: 2, name: 'Cutler' },
      { id: 3, name: 'Cynthia' },
      { id: 4, name: 'Cyril' },
      { id: 5, name: 'Cyrus' },
      { id: 6, name: 'Dagmar' },
      { id: 7, name: 'Dahl' },
      { id: 8, name: 'Dahlia' },
      { id: 9, name: 'Dailey' },
      { id: 10, name: 'Daine' }
    ]);
    const current = ref(1);
    const defaultPageSize = ref(6);
    const dataList = computed(() => {
      return chunk(lists, defaultPageSize.value);
    });
    const change = (num: number) => {
      current.value = num;
    };
    return () => (
      <ConfigProvider>
        <List dataSource={dataList.value[current.value - 1]}></List>
        <Pagination
          onChange={change}
          defaultCurrent={current.value}
          defaultPageSize={defaultPageSize.value}
          total={lists.length}
        ></Pagination>
        <RouterView></RouterView>
      </ConfigProvider>
    );
  }
});
