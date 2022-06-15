import Vue from 'vue'
import VueRouter from 'vue-router'
import UserRecords from '@/views/UserRecords'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'userrecords',
    component: UserRecords,
    props: true,
    meta: {
        requiresVisitor: true,
    }
  },
  {
    path: '/userrecords',
    name: 'userrecords',
    component: UserRecords,
    props: true,
    meta: {
        requiresVisitor: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
