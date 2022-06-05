import { createRouter, type RouteRecordRaw } from 'vue-router';
import d3Demo from '@/view/d3Demo';

const routes: RouteRecordRaw[] = [
  {
    path: '/d3',
    component: d3Demo
  }
];

export { routes };
