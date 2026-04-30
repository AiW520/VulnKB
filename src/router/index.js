import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/category/:category',
    name: 'category',
    component: () => import('../views/CategoryView.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    props: (route) => ({ query: route.query.q || '' }),
  },
  {
    path: '/vuln/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
