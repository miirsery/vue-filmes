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
        {
          path: 'halls',
          name: 'HallsPage',
          component: () => import('@/pages/Halls/HallsPage.vue'),
        },
        {
          path: 'table',
          name: 'UsersTablePage',
          component: () => import('@/pages/UsersTable/UsersTablePage.vue'),
        },
      ],
    },
  ],
})

export default router
