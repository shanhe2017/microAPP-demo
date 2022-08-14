import { createRouter, createWebHashHistory } from 'vue-router';
import BasicLayout from '../layouts/BasicLayout.vue';
// import BlankLayout from '../layouts/BlankLayout.vue';
// import NestedLayout from '@/layouts/NestedLayout.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { title: 'Home' },
      component: BasicLayout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '主页', icon: 'icon-home1' },
          component: () => import('../views/home/index.vue'),
        },
        {
          path: '/home2',
          name: 'home2',
          meta: { title: '主页2', icon: 'icon-home1' },
          component: () => import('../views/homeTwo/index.vue'),
        },
      ],
    },
  ],
});
