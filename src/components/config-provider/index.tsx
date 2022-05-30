import { defineComponent, provide, reactive, watchEffect } from 'vue';
import type { App } from 'vue';
import { configProviderProps } from './context';
import type { ConfigProviderProps } from './context';
export const defaultPrefixCls = 'kke';
function getGlobalPrefixCls(): string {
  return globalConfigForApi.prefixCls || defaultPrefixCls;
}
export const globalConfigForApi = reactive<
  ConfigProviderProps & {
    getRootPrefixCls?: (rootPrefixCls?: string, customizePrefixCls?: string) => string;
  }
>({});

watchEffect(() => {
  globalConfigForApi.prefixCls = getGlobalPrefixCls();
  globalConfigForApi.getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return (suffixCls ? `${globalConfigForApi.prefixCls}-${suffixCls}` : globalConfigForApi.prefixCls) as string;
  };
  globalConfigForApi.getRootPrefixCls = (rootPrefixCls?: string, customizePrefixCls?: string) => {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls;
    }

    // If Global prefixCls provided, use this
    if (globalConfigForApi.prefixCls) {
      return globalConfigForApi.prefixCls;
    }
    if (customizePrefixCls && customizePrefixCls.includes('-')) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
    }
    return getGlobalPrefixCls();
  };
});
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
