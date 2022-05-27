import type { InjectionKey, ExtractPropTypes, UnwrapRef } from 'vue';
import { reactive } from 'vue';
import { string, func, bool } from 'vue-types';
export const GlobalConfigContext: InjectionKey<string> = Symbol('GlobalConfigContextkey');
export type SizeType = 'small' | 'middle' | 'large';
export type Direction = 'ltr' | 'rtl';
export interface CSPConfig {
  nonce?: string; // 防止wave组件生成的style标签，跨站脚本XSS 攻击
}
export interface Theme {
  primaryColor?: string;
  infoColor?: string;
  successColor?: string;
  processingColor?: string;
  errorColor?: string;
  warningColor?: string;
}

export const configProviderProps = () => ({
  componentsSize: string<SizeType>(),
  direction: string<Direction>(),
  prefixCls: string(),
  getPrefixCls: func<(suffixCls?: string, customizePrefixCls?: string) => string>(),
  getPopupContainer: func<(triggerNode: HTMLElement) => HTMLElement>(),
  getTargetContainer: func<() => HTMLElement>(),
  autoInsertSpaceInButton: bool().def(false),
  componentSize: string<SizeType>()
});
export type ConfigProviderProps = Partial<ExtractPropTypes<ReturnType<typeof configProviderProps>>>;
export const defaultConfigProvider: UnwrapRef<ConfigProviderProps> = reactive({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `kke-${suffixCls}` : 'kke';
  },
  direction: 'ltr'
});
