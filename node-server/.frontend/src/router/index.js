import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import HomeLogin from '../views/HomeLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeLogin',
    component: HomeLogin
  },
  {
    path: '/home',
    name: 'HomeLogin',
    component: HomeLogin
  },
  {
    path: '/user-profile',
    name: 'Profile',
    component: () => import('../views/UserProfile')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
