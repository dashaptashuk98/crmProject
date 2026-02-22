import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/draft',
      name: 'draft',
      component: () => import('../views/DraftView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/charts',
      name: 'charts',
      component: () => import('../views/ChartsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/finance',
      name: 'finance',
      component: () => import('../views/InProgressView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/InProgressView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      next({ name: 'home' })
      return
    }
  }
  next()
})

export default router
