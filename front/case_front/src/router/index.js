import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    name: 'home',
    component: ()=> import('@/views/Home.vue')
  },
  {
    path: '/case/:id',
    name: 'case',
    component: ()=> import('@/views/Case.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: ()=> import('@/views/auth.vue')
  },
  {
    path: '/admin',
    redirect: '/admin/case/list'
  },
  {
    path: '/admin/:category/:function',
    name: 'admin',
    component: ()=> import('@/views/Admin.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: ()=> import('@/views/Inventory.vue')
  },
  {
    path: '/upgrade',
    name: 'upgrade',
    component: ()=> import('@/views/Upgrade.vue')
  },
  {
    path: '/contract',
    name: 'contract',
    component: ()=> import('@/views/Contracts.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
