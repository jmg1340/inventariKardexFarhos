
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/importF',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/importarFARHOS.vue') }
    ]
  },
  {
    path: '/importK',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/importarKARDEX.vue') }
    ]
  },
  {
    path: '/comparativa',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/comparativa.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
