import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Equipment from '@/views/Equipment.vue'
import Product from '@/views/Product.vue'
import Warehouse from '@/views/Warehouse.vue'
import AssemblyLine from '@/views/AssemblyLine.vue'

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
  },
  {
    path: '/Product',
    name: 'Product',
    component: Product
  },
  {
    path: '/Warehouse',
    name: 'Warehouse',
    component: Warehouse
  },
  {
    path: '/AssemblyLine',
    name: 'AssemblyLine',
    component: AssemblyLine
  },
]

const router = createRouter({
  history: createWebHashHistory(), // 将 createWebHistory 改为 createWebHashHistory
  routes
})

export default router
