import { createRouter, createWebHistory } from 'vue-router'
import Monitor from '../views/Monitor.vue'
import Admin from '../views/Admin.vue'
import Cases from '../views/Cases.vue'
import Sites from '../views/Sites.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    redirect: '/monitor'
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: Monitor
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/cases',
    name: 'Cases',
    component: Cases
  },
  {
    path: '/sites',
    name: 'Sites',
    component: Sites
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    props: route => ( { query: route.query } )
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
