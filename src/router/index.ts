import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'

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
          path: 'employees',
          name: 'EmployeesPage',
          component: () => import('@/pages/Employees/EmployeesPage.vue'),
        },
      ],
    },
    {
      path: '/auth/',
      name: 'LoginLayout',
      component: LoginLayout,
      children: [
        {
          path: 'login',
          name: 'LoginPage',
          component: () => import('@/pages/LoginPage.vue'),
        },
      ],
    },
  ],
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
})

export default router
