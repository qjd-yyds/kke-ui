import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'KkePacManLoading',
  setup() {
    const prefixCls = 'kke-loading';
    const classes = computed(() => {
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}-pacman`]: true
      };
    });
    // 吃豆人loading
    return () => {
      const loadingProps = {
        class: [classes.value]
      };
      return (
        <div {...loadingProps}>
          <div class="pacman-item"></div>
          <div class="pacman-item"></div>
          <div>
            <div class="pacman-beans"></div>
            <div class="pacman-beans"></div>
            <div class="pacman-beans"></div>
          </div>
        </div>
      );
    };
  }
});
