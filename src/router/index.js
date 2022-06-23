import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 一级布局容器
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home/index.vue') },
      { path: '/category/:id', component: () => import('@/views/category/TopCategory.vue') },
      { path: '/category/sub/:id', component: () => import('@/views/category/SubCategory.vue') },
      { path: '/product/:id', component: () => import('@/views/goods/index') }
    ]
  },

  {
    path: '/login', component: () => import('@/views/login/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
