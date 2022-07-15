import { computed, defineComponent, ref, watch } from 'vue';
import { func, number } from 'vue-types';

export default defineComponent({
  name: 'Pager',
  props: {
    totalPage: number(),
    defaultCurrent: number().def(1),
    centerSize: number().def(5),
    jumpSize: number().def(1),
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { defaultCurrent } = props;
    const current = ref(defaultCurrent);
    const setPage = (num: number) => {
      let newPage = num;
      if (num < 1) return;
      if (num > props.totalPage) newPage = props.totalPage;
      current.value = newPage;
      emit('change', newPage);
    };
    // 中间页码为 加上两边各两个，至少需要5个，加上首尾，需要7
    // 所以小于7个centerpages是除了首尾的所有页码
    // 大于7个center是以current为中心，左右两边加两个
    const centerPages = computed(() => {
      let centerPage = current.value;
      const centerArr = [];
      if (current.value > props.totalPage - 3) {
        centerPage = props.totalPage - 3;
      }
      if (current.value < 4) {
        centerPage = 4;
      }
      // 这里表示小于7个页码
      if (props.totalPage <= centerPage + 2) {
        for (let i = 2; i < props.totalPage; i++) {
          centerArr.push(i);
        }
      } else {
        for (let i = centerPage - 2; i <= centerPage + 2; i++) {
          if (i > 1) {
            centerArr.push(i);
          }
        }
      }
      return centerArr;
    });
    watch(
      () => props.defaultCurrent,
      n => {
        console.log(props.defaultCurrent);
        current.value = n;
      }
    );
    return () => {
      const { totalPage, centerSize, jumpSize } = props;
      return (
        <ul class="kke-pagination-pager">
          <li
            class={{
              number: true,
              active: current.value === 1
            }}
            onClick={setPage.bind(this, 1)}
          >
            1
          </li>
          <li
            onClick={setPage.bind(this, current.value - jumpSize)}
            class="more left"
            v-show={totalPage > centerSize + 2 && current.value >= centerSize}
          >
            ...
          </li>
          {centerPages.value.map(item => {
            return (
              <li
                class={{
                  number: true,
                  active: current.value === item
                }}
                onClick={setPage.bind(this, item)}
                key={item}
              >
                {item}
              </li>
            );
          })}
          <li
            class="more right"
            onClick={setPage.bind(this, current.value + jumpSize)}
            v-show={totalPage > centerSize + 2 && current.value <= totalPage - centerSize + 1}
          >
            ...
          </li>
          <li
            class={{
              number: true,
              active: current.value === totalPage
            }}
            onClick={setPage.bind(this, totalPage)}
          >
            {totalPage}
          </li>
        </ul>
      );
    };
  }
});
