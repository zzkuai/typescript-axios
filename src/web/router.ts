import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./pages/home.vue'),
    },
    {
      path: '/simple',
      name: 'simple',
      component: () => import('./pages/simple.vue'),
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('./pages/base.vue'),
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('./pages/error.vue'),
    },
    {
      path: '/extend',
      name: 'extend',
      component: () => import('./pages/extend.vue'),
    },
    {
      path: '/interceptor',
      name: 'interceptor',
      component: () => import('./pages/interceptor.vue'),
    },
    {
      path: '/config',
      name: 'config',
      component: () => import('./pages/config.vue'),
    },
  ],
})

export default router
