import Vue from 'vue'
import VueRouter from 'vue-router'
import MapModel from '@/views/mapModel/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/base',
    name: 'base',
    component: () => import('@/layout/appLayout.vue'),
    redirect: (to: any) => {
      return '/hardware'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/mapModel/index.vue')
      },
      //   教学资源
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resourceModel/index.vue')
      },
      //  运维管控
      {
        path: '/hardware',
        name: 'hardware',
        component: () => import('@/views/hardWareData/index.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About.vue')
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/components/404/index.vue')
      },
    ]
  },
  {
    path: '/',
    name: 'user',
    component: () => import('@/layout/userLayout.vue'),
    redirect: (to: any) => {
      return '/login'
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '',
    component: () => import('@/layout/appLayout.vue'),
    redirect: (to: any) => {
      return '/404'
    },
    children: [
      {
        path: '/404',
        name: '404',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/components/404/index.vue')
      },
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
