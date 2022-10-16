import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: 'users',
          name: 'UsersPage',
          component: () => import('@/pages/Users/UsersPage.vue'),
        },
        {
          path: 'movies',
          name: 'MoviesPage',
          component: () => import('@/pages/Movies/MoviesPage.vue'),
        },
        {
          path: 'tickets',
          name: 'TicketsPage',
          component: () => import('@/pages/Tickets/TicketsPage.vue'),
        },
      ],
    },
  ],
})

export default router
