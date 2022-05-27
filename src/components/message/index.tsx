import type { VueNode } from '@/utils';
import Notification from '@/components/notification/notification';
import { CSSProperties } from 'vue';
let defaultDuration = 3;
let key = 1;
let messageInstance: any;
let getContainer = () => document.body;

function getKeyThenIncreaseKey() {
  return key++;
}
export interface MessageType extends PromiseLike<any> {
  (): void;
}
export interface MessageArgsProps {
  content: string | (() => VueNode) | VueNode;
  duration?: number;
  key?: string | number;
  style?: CSSProperties;
  class?: string;
  getContainer?: () => HTMLElement;
  onClose?: () => void;
}
export type NoticeType = 'oinf' | 'success' | 'error' | 'warning' | 'loading';
export type ThenableArgument = (val: any) => void;
export type ConfigOnClose = () => void;
type JointContent = VueNode | MessageArgsProps;
// 类型约束判断是否是vnode
function isArgsProps(content: JointContent): content is MessageArgsProps {
  return Object.prototype.toString.call(content) === '[object Object]' && !!(content as MessageArgsProps).content;
}
// 获取message实例并且执行callback
function getMessageInstance(args: MessageArgsProps, callback: (i: any) => void) {
  if (messageInstance) {
    // 防止多次创建message实例
    callback(messageInstance);
    return;
  }
  Notification.newInstance(
    {
      name: 'message',
      getContainer,
      maxCount: 4
    },
    (instance: any) => {
      if (messageInstance) {
        callback(messageInstance);
      } else {
        messageInstance = instance;
        callback(messageInstance);
      }
    }
  );
}
// 返回的open方法
function notice(args: MessageArgsProps) {
  const duration = args.duration === undefined ? defaultDuration : args.duration;
  const target = args.key || getKeyThenIncreaseKey();
  const closePromise = new Promise(resolve => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        console.log("执行用户传入的onClose回调函数");
        args.onClose();
      }
      resolve(true);
    };
    getMessageInstance(args, instance => {
      // 将当前key作为message的标识推入队列
      instance.notice({
        key: target,
        onClose: callback
      });
    });
  });
  const result = () => {};
  result.then = (fulfilled: ThenableArgument, rejected: ThenableArgument) => closePromise.then(fulfilled, rejected);
  return result;
}
const api: any = {
  open: notice
};
export const attachTypeApi = (originalApi: MessageApi, type: NoticeType) => {
  api[type] = (content: JointContent, duration?: number, onClose?: ConfigOnClose) => {
    if (isArgsProps(content)) {
      console.log(content);
      return;
    }
    if (typeof duration === 'function') {
    }
    return originalApi.open({
      content,
      duration,
      onClose
    });
  };
};
(['info', 'success', 'error', 'warning', 'loading'] as NoticeType[]).forEach(type => {
  attachTypeApi(api, type);
});
export interface MessageInstance {
  info(): void;
  success(): void;
  error(): void;
  warning(): void;
  loading(): void;
  open(args: MessageArgsProps): void;
}

export interface MessageApi extends MessageInstance {
  warn(): void;
  config(): void;
  destroy(): void;
}
export default api as MessageApi;
