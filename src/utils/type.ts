import { VNode } from 'vue';

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;

export type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element;
