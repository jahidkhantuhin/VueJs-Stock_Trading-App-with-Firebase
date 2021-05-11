import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index'

import OldHome from '../views/Old-Home.vue'
import Home from '@/components/Home.vue'
import Portfolio from '@/components/Portfolio/Portfolio.vue'
import Stocks from '@/components/Stocks/Stocks.vue'
import Signup from '@/components/Auth/signup.vue'
import Signin from '@/components/Auth/signin.vue'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: Portfolio,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: Stocks,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/old-home',
    name: 'old-home',
    component: OldHome
  },
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
