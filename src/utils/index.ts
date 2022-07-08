import { Fragment, isVNode, Comment, VNode, Text, ComponentInternalInstance, ComponentPublicInstance } from 'vue';
import { isValid } from './isValid';
export const isEmptyElement = (c: VNode) => {
  return (
    c &&
    (c.type === Comment ||
      (c.type === Fragment && c.children?.length === 0) ||
      (c.type === Text && typeof c.children === 'string' && c.children?.trim() === ''))
  );
};
export const flattenChildren = (children: any[] = [], filterEmpty = true) => {
  const temp = Array.isArray(children) ? children : [children];
  const res: any[] = [];
  temp.forEach(child => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty));
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children, filterEmpty));
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child);
    }
  });
  return res;
};

/**
 * @description: 获取虚拟dom中dom节点
 * @param {object} instance
 * @return {Element} node
 */
export const findDOMNode = (instance: any): HTMLElement => {
  let node = instance.vnode.el || (instance && (instance.$el || instance));
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};

export { default as raf } from './raf';
export type { VueNode } from './type';
export * from './throttle';
