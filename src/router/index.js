import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Report from '../views/Report.vue'
import VueInfo from '../views/VueInfo.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Hem',
    component: Home
  },
  {
    path: '/report',
    name: 'Redovisning',
    component: () => import('../views/Report.vue')
  },
  {
    path: '/report/kmom01',
    name: 'Kmom01',
    component: () => import('../views/kmom01.vue')
  },
  {
    path: '/about',
    name: 'Om',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vueinfo',
    name: 'VueInfo',
    component: VueInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
