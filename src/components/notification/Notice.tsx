import { defineComponent, computed, onMounted, onUnmounted, watch } from 'vue';

export default defineComponent({
  name: 'Notice',
  props: ['duration', 'noticeKey', 'onClose', 'prefixCls'],
  inheritAttrs: false,
  setup(props, { slots }) {
    let closeTimer: any;
    // 默认3s后自动关闭
    const duration = computed(() => (props.duration === undefined ? 3 : props.duration));
    const clearCloseTimer = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };
    // 卸载当前组件
    const close = (e?: MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      clearCloseTimer();
      const { noticeKey, onClose } = props;
      if (onClose) {
        onClose(noticeKey);
      }
    };
    const startCloseTimer = () => {
      if (duration.value) {
        closeTimer = setTimeout(() => {
          close();
        }, duration.value * 1000);
      }
    };
    const restartCloseTimer = () => {
      clearCloseTimer();
      startCloseTimer();
    };
    watch(
      duration,
      (n, o) => {
        if (n !== o) {
          restartCloseTimer();
        }
      },
      {
        flush: 'post'
      }
    );
    onMounted(() => {
      startCloseTimer();
    });
    onUnmounted(() => {
      clearCloseTimer();
    });
    return () => {
      const { prefixCls } = props;
      const componentClass = `${prefixCls}-notice`;
      return (
        <div class={componentClass}>
          <div class={`${componentClass}-content`}>{slots.default?.()}</div>
        </div>
      );
    };
  }
});
