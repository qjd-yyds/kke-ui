import { createRouter, type RouteRecordRaw } from 'vue-router';
import d3Demo from '@/view/d3Demo';
import scrollShow from '@/view/scrollShow';
import Loading from '@/view/Loading';
const routes: RouteRecordRaw[] = [
  {
    path: '/d3',
    component: d3Demo
  },
  {
    path: '/scroll',
    component: scrollShow
  },
  {
    path: '/loading',
    component: Loading
  }
];

export { routes };
