
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import User from '@/components/User/User.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:{name:'User'}
  },
  {
    path:'/Dashboard',
    name:'Main',
    component:()=>import('@/components/Main.vue'),
    children:[
      {
        path:'User',
        name:'User',
        component:User
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
   
   
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
