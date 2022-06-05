import useConfigInject from '@/utils/hooks/useConfigInject';
import { createVNode, defineComponent } from 'vue';
import { string, bool } from 'vue-types';

export const baseProps = () => ({
  prefixCls: string(),
  hasSider: bool().def(false),
  tagName: string<'header' | 'footer' | 'main' | 'section'>()
});
type GeneratorArgument = {
  suffixCls: string;
  tagName: 'header' | 'footer' | 'main' | 'section';
  name: string;
};
// 这里通过接受一个标签名字，组件名，和css类名字来生成一个组件
function generator({ suffixCls, tagName, name }: GeneratorArgument) {
  return (BaseComponent: typeof Basic) => {
    const Adapter = defineComponent({
      setup(props, { slots }) {
        const { prefixCls } = useConfigInject(suffixCls, props);
        return () => {
          const basicComponentsProps = {
            ...props,
            prefixCls: prefixCls.value,
            tagName
          };
          return <BaseComponent {...basicComponentsProps} v-slots={slots}></BaseComponent>;
        };
      }
    });
    return Adapter;
  };
}
const Basic = defineComponent({
  props: baseProps(),
  setup(props, { slots }) {
    return () =>
      createVNode(
        props.tagName,
        {
          class: props.prefixCls
        },
        slots
      );
  }
});

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  name: 'KLayoutHeader'
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  name: 'KLayoutFooter'
})(Basic);

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  name: 'KLayoutContent'
})(Basic);

export { Header, Footer, Content };
