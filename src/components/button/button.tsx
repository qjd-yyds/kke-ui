import { computed, defineComponent, ref } from 'vue';
import buttonType from './buttonTypes';
import type { ButtonType } from './buttonTypes';
import { flattenChildren } from '@/utils';
import './style/index.less';
import Wave from './wave';
// 匹配两个中文
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;

function isUnborderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

export const Button = defineComponent({
  name: 'KButton',
  inheritAttrs: false,
  __KKE_BUTTON: true,
  props: buttonType(),
  setup(props, { slots, attrs, emit }) {
    const buttonNodeRef = ref<HTMLElement>(null!);
    const { prefixCls = 'kke-btn', size, htmlType,disabled } = props;
    const handleClick = (event: Event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      emit('click', event);
    };
    const classes = computed(() => {
      const { type, shape = 'default', ghost, block, danger } = props;
      const pre = prefixCls;
      const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
      return {
        [`${pre}`]: true,
        [`${pre}-${type}`]: type
      };
    });
    return () => {
      const buttonProps = {
        ...attrs,
        disabled,
        class: [classes.value],
        onClick: handleClick
      };
      const children = flattenChildren(slots.default?.());
      return (
        <Wave>
          <button ref={buttonNodeRef} {...buttonProps} type={htmlType}>
            {children}
          </button>
        </Wave>
      );
    };
  }
});
