import { createRouter, createWebHistory } from 'vue-router';

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
        },
        {
          path: 'total',
          name: 'total',
          component: () => import('@/views/TotalInfo.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'year1',
          name: 'YearInfoLine',
          component: () => import('@/views/year/YearInfo1.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'year2',
          name: 'YearInfo2',
          component: () => import('@/views/year/YearInfo2.vue'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'year3',
          name: 'YearInfo3',
          component: () => import('@/views/year/YearInfo3.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'year4',
          name: 'YearInfo4',
          component: () => import('@/views/year/YearInfo4.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'country1',
          name: 'CountryInfo1',
          component: () => import('@/views/country/CountryInfo1.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'country2',
          name: 'CountryInfo2',
          component: () => import('@/views/country/CountryInfo2.vue'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'country3',
          name: 'CountryInfo3',
          component: () => import('@/views/country/CountryInfo3.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'country4',
          name: 'CountryInfo4',
          component: () => import('@/views/country/CountryInfo4.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'country5',
          name: 'CountryInfo5',
          component: () => import('@/views/country/CountryInfo5.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'ranking',
          name: 'Ranking',
          component: () => import('@/views/DescendantRanking.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'sameClassificationPercentage',
          name: 'SameClassificationPercentage',
          component: () => import('@/views/SameClassificationPercentage.vue'),
          meta: {
            keepAlive: true
          }
        }
      ]
    }
  ]
});

export default router;
