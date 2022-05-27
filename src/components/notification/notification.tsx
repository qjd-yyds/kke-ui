import { defineComponent, createVNode, render, ref, onMounted, TransitionGroup, computed } from 'vue';
import type { VNodeRef, PropType, StyleValue } from 'vue';
import { string, number, oneOfType } from 'vue-types';
import Notice from './Notice';
import { getTransitionGroupProps } from '@/utils/transition';
type Key = number | string;
let seed = 0;
const now = Date.now();
function getUuid() {
  const id = seed;
  seed++;
  return `notification_${now}_${id}`;
}
export type HolderReadyCallback = (div: HTMLDivElement, noticeProps: any) => void;
type NotificationState = {
  notice: {
    userPassKey?: Key;
    key?: Key;
    onClose?: () => void;
  };
  holderCallback?: HolderReadyCallback;
};
const Notification = defineComponent({
  name: 'notification',
  inheritAttrs: false,
  props: {
    noticeKey: oneOfType([String, Number]),
    duration: number(),
    animation: string(),
    prefixCls: string(),
    transitionName: string()
  },
  setup(props, { emit, expose, attrs }) {
    const notices = ref<NotificationState[]>([]);
    const add = (originNotice: any, holderCallback?: HolderReadyCallback) => {
      const key = getUuid();
      const notice = {
        ...originNotice,
        key
      };
      const noticeIndex = notices.value.map(v => v.notice.key).indexOf(key);
      const updatedNotices = notices.value;
      if (noticeIndex !== -1) {
        updatedNotices.splice(noticeIndex, 1, { notice, holderCallback });
      } else {
        updatedNotices.push({ notice, holderCallback });
      }
    };
    // 去除指定元素
    const remove = (removeKey: Key) => {
      notices.value = notices.value.filter(({ notice: { key, userPassKey } }) => {
        const mergedKey = userPassKey || key;
        return mergedKey !== removeKey;
      });
    };
    const onClose = (key: Key) => {
      remove(key);
    };
    expose({
      add,
      remove
    });
    return () => {
      const className = {
        [attrs.class as string]: !!attrs.class
      };
      const transitionProps = computed(() => {
        const { animation = 'fade', prefixCls } = props;
        let name = props.transitionName;
        if (!name && animation) {
          name = `${prefixCls}-${animation}`;
        }
        return getTransitionGroupProps(name!);
      });
      const noticeNodes = notices.value.map(item => {
        const { notice } = item;
        const noticeProps = {
          noticeKey: notice.key,
          key: notice.key,
          onClose: (noticeKey: Key) => {
            remove(noticeKey);
            notice.onClose?.();
          }
        };
        return <Notice {...noticeProps}></Notice>;
      });
      return (
        <div class={className} style={(attrs.style as StyleValue) || { top: '65px', left: '50%' }}>
          <TransitionGroup tag="div">{noticeNodes}</TransitionGroup>
        </div>
      );
    };
  }
});
Notification.newInstance = (properties: any, callback: any) => {
  const { name = 'notification', getContainer, ...props } = properties;
  const div = document.createElement('div');
  if (getContainer) {
    const container = getContainer();
    container.appendChild(div);
  } else {
    document.body.appendChild(div);
  }
  const Wrapper = defineComponent({
    name: 'NotificationWrapper',
    setup(props, { attrs }) {
      const notiRef = ref();
      onMounted(() => {
        callback({
          notice(noticeProps: any) {
            notiRef.value.add(noticeProps);
          },
          removeNotice(key: Key) {
            notiRef.value.remove(key);
          },
          destroy() {
            render(null, div);
            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
          },
          component: notiRef
        });
      });
      return () => <Notification ref={notiRef} {...(attrs as any)}></Notification>;
    }
  });
  // 创建一个vnode
  const vm = createVNode(Wrapper, props);
  // 挂载到准备好的容器中
  render(vm, div);
};
export default Notification;
