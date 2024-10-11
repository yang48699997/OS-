import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/components/Home.vue'
import Equipment from '@/components/Equipment.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Equipment',
    name: 'Equipment',
    component: Equipment
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 将 createWebHistory 改为 createWebHashHistory
  routes
})

export default router
