import { createRouter, createWebHistory } from 'vue-router'

const exitGuard = function(to, from, next){
  let formData = new FormData();
  formData.append('token', localStorage.getItem('token'));
  fetch(`http://${window.location.hostname}:8000/api/v1/auth/status`,{
      method: "POST",
      body: formData,
  }).then(res=>res.json()).then(data=>{
    if(!data) next ({name: "home"});
    else next()
  })
}

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
    redirect: '/admin/case/list',
    beforeEnter:exitGuard,
  },
  {
    path: '/admin/:category/:function',
    name: 'admin',
    component: ()=> import('@/views/Admin.vue'),
    beforeEnter:exitGuard,
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
