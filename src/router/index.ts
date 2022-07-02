import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CatBrowserPage from '../views/CatBrowser.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'cat-browser',
    component: CatBrowserPage
  },
  {
    path: '/:id',
    name: 'breed-details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BreedDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
