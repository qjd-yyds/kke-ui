import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted } from 'vue';
import { findDOMNode, raf } from '@/utils';
let styleForPesudo: HTMLStyleElement | null = null;
export default defineComponent({
  name: 'Wave',
  setup(props, { slots, expose }) {
    let eventIns:
      | {
          cancel: () => void;
        }
      | undefined;
    let clickWaveTimeoutId = null;
    let extraNode: HTMLDivElement | null = null;
    let animationStartId: number | null = null;
    let animationStart = false;
    const instance = getCurrentInstance();
    const resetEffect = (node: HTMLElement) => {
      const attributeName = getAttributeName();
      node.setAttribute(attributeName, 'false'); // edge has bug on `removeAttribute` #14466
      if (styleForPesudo) {
        styleForPesudo.innerHTML = '';
      }
      if (extraNode && node.contains(extraNode)) {
        node.removeChild(extraNode);
      }
    };
    const getAttributeName = () => {
      // const { insertExtraNode } = props;
      // return insertExtraNode
      //   ? `${prefixCls.value}-click-animating`
      //   : `${prefixCls.value}-click-animating-without-extra-node`;
      return 'kke-click-animating-without-extra-node';
    };
    const onClick = (node: HTMLElement, waveColor: string) => {
      extraNode = document.createElement('div');
      extraNode.className = 'kke-click-animating-node';
      const attributeName = getAttributeName();
      node.removeAttribute(attributeName);
      node.setAttribute(attributeName, 'true');
      styleForPesudo = styleForPesudo || document.createElement('style');

      extraNode.style.borderColor = waveColor;
      styleForPesudo.innerHTML = `[kke-click-animating-without-extra-node='true']::after,.kke-click-animating-node{
        --kke-wave-shadow-color: ${waveColor};
      }`;
      if (!document.body.contains(styleForPesudo)) {
        document.body.appendChild(styleForPesudo);
      }
      // node.appendChild(extraNode);
    };
    const bindAnimationEvent = (node: HTMLElement) => {
      if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
        return;
      }
      const handleClick = () => {
        resetEffect(node);
        const style = getComputedStyle(node);
        const waveColor =
          style.getPropertyValue('border-top-color') ||
          style.getPropertyValue('border-color') ||
          style.getPropertyValue('background-color');
        clickWaveTimeoutId = setTimeout(() => {
          onClick(node, waveColor);
        }, 0);
        // 清除动画帧
        raf.cancel(animationStartId!);
        // 将动画状态打开
        animationStart = true;
        // 10个动画帧后，关闭动画状态
        animationStartId = raf(() => {
          animationStart = false;
        }, 10);
      };
      // 给当前node注册一个事件
      node.addEventListener('click', handleClick, true);
      return {
        cancel: () => {
          node.removeEventListener('click', handleClick, true);
        }
      };
    };
    onMounted(() => {
      const node = findDOMNode(instance);
      if (node.nodeType !== 1) return;
      eventIns = bindAnimationEvent(node);
    });
    onBeforeUnmount(() => {
      if (eventIns) {
        eventIns.cancel();
      }
    });
    return () => slots.default?.();
  }
});
