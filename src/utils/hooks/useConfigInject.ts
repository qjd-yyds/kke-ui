import type { ConfigProviderProps } from '@/components/config-provider/context';
import type { UnwrapRef } from 'vue';
import { defaultConfigProvider } from '@/components/config-provider/context';
import { computed, inject } from 'vue';
export default (name: string, props: Record<string, any>) => {
  const configProvider = inject<UnwrapRef<ConfigProviderProps>>('configProvider', defaultConfigProvider);
  const prefixCls = computed(() => configProvider.getPrefixCls?.(name, props.prefixCls));
  const direction = computed(() => props.direction ?? configProvider.direction);
  const size = computed(() => props.size || configProvider.componentSize);
  return {
    configProvider,
    prefixCls,
    direction,
    size
  };
};
