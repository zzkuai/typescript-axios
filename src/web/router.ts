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
  ],
})

export default router
