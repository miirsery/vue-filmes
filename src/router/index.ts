import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthorizationLayout from '@/layouts/AuthorizationLayout.vue'

// @ts-ignore
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('@/pages/HomePage.vue'),
        },
      ],
    },
    {
      path: '/authorization',
      name: 'AuthorizationLayout',
      component: AuthorizationLayout,
      redirect: { name: 'TheLogin' },
      children: [
        {
          path: 'registration',
          name: 'TheRegistration',
          component: () => import('@/pages/TheAuthorization/TheRegistration/TheRegistration.vue'),
        },
        {
          path: 'login',
          name: 'TheLogin',
          component: () => import('@/pages/TheAuthorization/TheLogin/TheLogin.vue'),
        },
        {
          path: 'recovery',
          name: 'TheRecovery',
          component: () => import('@/pages/TheAuthorization/TheRecovery/TheRecovery.vue'),
        },
      ],
    },
  ],
})

export default router
