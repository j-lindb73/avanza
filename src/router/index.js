import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Report from '../views/Report.vue'
import ReportNew from '../views/ReportNew.vue'
import ReportEdit from '../views/ReportEdit.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import VueInfo from '../views/VueInfo.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Hem',
    component: Home
  },
  {
    path: '/reports/week/new',
    name: 'Ny rapport',
    component: ReportNew
  },
  {
    path: '/reports/week/edit/:kmom',
    name: 'Redigera rapport',
    component: ReportEdit
  },
  {
    path: '/reports/week/:kmom',
    name: 'Redovisning',
    component: Report
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
