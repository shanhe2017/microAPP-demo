import { createRouter, createWebHistory } from 'vue-router';
import BasicLayout from '../layouts/BasicLayout.vue';
import BlankLayout from '../layouts/BlankLayout.vue';

export default createRouter({
  history: createWebHistory(),
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
          meta: { title: '首页', icon: 'icon-home1' },
          component: () => import('@/views/home/index.vue'),
        },
        {
          path: '/order/:page*',
          name: 'order',
          meta: { title: '子应用', icon: 'icon-home1' },
          component: () => import('@/views/order/index.vue'),
        },
      ],
    },
  ],
});
