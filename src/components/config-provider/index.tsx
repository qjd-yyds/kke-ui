import { defineComponent, provide, reactive } from 'vue';
import type { App } from 'vue';
import { configProviderProps } from './context';
const ConfigProvider = defineComponent({
  name: 'KConfigProvider',
  inheritAttrs: false,
  props: configProviderProps(),
  setup(props, { slots }) {
    const getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls = 'kke' } = props;
      if (customizePrefixCls) return customizePrefixCls;
      return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
    };
    // 前缀类名字
    const getPrefixClsWrapper = (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props;
      if (customizePrefixCls) return customizePrefixCls;
      const mergedPrefixCls = prefixCls || getPrefixCls('');
      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    };
    const configProvider = reactive({
      ...props,
      getPrefixCls: getPrefixClsWrapper
    });
    provide('configProvider', configProvider);
    return () => {
      return slots.default?.();
    };
  }
});
ConfigProvider.install = (app: App) => {
  app.component(ConfigProvider.name, ConfigProvider);
};
export default ConfigProvider;
