import { computed, defineComponent, ref } from 'vue';
import { func, number } from 'vue-types';
import Button from './button';
import Pager from './pager';
export const Pagination = defineComponent({
  name: 'KkePagination',
  props: {
    total: number().def(1),
    defaultPageSize: number().def(1),
    defaultCurrent: number().def(1)
  },
  emits: ['change'],
  setup(props, { emit }) {
    const current = ref(props.defaultCurrent);
    const totalPage = computed(() => Math.ceil(props.total / props.defaultPageSize));
    const setPage = (page: number) => {
      if (page < 1) return;
      if (page > totalPage.value) return;
      current.value = page;
      emit('change', current.value);
    };
    return () => {
      return (
        <div class="kke-pagination">
          <Button onClick={() => setPage(current.value - 1)}>&lt;</Button>
          <Pager
            totalPage={totalPage.value}
            defaultCurrent={current.value}
            onChange={num => {
              setPage(num);
            }}
          ></Pager>
          <Button onClick={() => setPage(current.value + 1)}>&gt;</Button>
        </div>
      );
    };
  }
});
