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
        {
          path: '/movie',
          name: 'Movie',
          component: () => import('@/pages/Movie/MoviePage.vue'),
        },
        {
          path: '/movie/:id',
          name: 'MovieDetailed',
          component: () => import('@/pages/MovieDetailed/MovieDetailedPage.vue'),
        },
        {
          path: '/cinemas',
          name: 'CinemasPage',
          component: () => import('@/pages/Cinemas/CinemasPage.vue'),
        },
        {
          path: '/cinemas/:id',
          name: 'CinemaPage',
          component: () => import('@/pages/Cinema/CinemaPage.vue'),
        },
        {
          path: '/profile',
          name: 'UserPage',
          component: () => import('@/pages/User/UserPage.vue'),
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
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/NotFoundPage.vue') },
  ],
})

export default router
