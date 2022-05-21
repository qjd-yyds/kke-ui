import type { PropType } from 'vue';
export type ButtonType = 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text'|'danger';

export type ButtonShape = 'default' | 'circle' | 'round';

export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export type LegacyButtonType = ButtonType | 'danger';

export type SizeType = 'small' | 'middle' | 'large' | undefined;

export const buttonType = () => ({
  prefixCls: String,
  type: String as PropType<ButtonType>,
  htmlType: { type: String as PropType<ButtonHTMLType>, default: 'button' },
  shape: { type: String as PropType<ButtonShape> },
  size: {
    type: String as PropType<SizeType>
  },
  loading: {
    type: [Boolean, Object] as PropType<boolean | { delay?: number }>,
    default: (): boolean | { delay?: number } => false
  },
  disabled: { type: Boolean, default: undefined },
  ghost: { type: Boolean, default: undefined },
  block: { type: Boolean, default: undefined },
  danger: { type: Boolean, default: undefined },
  icon: {}, // any
  href: String,
  target: String,
  title: String,
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>
  },
  onMousedown: {
    type: Function as PropType<(event: MouseEvent) => void>
  }
});

export default buttonType;
