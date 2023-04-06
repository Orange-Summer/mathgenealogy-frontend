import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/HomeLayout.vue'),
      meta: {
        keepAlive: false
      },
      children: [
        {
          path: 'all',
          component: () => import('@/views/MathematicianList.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'person/:id',
          name: 'person',
          component: () => import('@/views/MathematicianDetail.vue'),
          meta: {
            keepAlive: true
          }
        }
      ]
    }
  ]
})

export default router
