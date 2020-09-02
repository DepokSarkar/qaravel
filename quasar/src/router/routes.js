
const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: 'user', name: 'Login.user', component: () => import('pages/Login.vue') },
      { path: 'staff', name: 'Login.staff', component: () => import('pages/Login.vue') },
      { path: 'admin', name: 'Login.admin', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      { path: '', name: 'Dashboard', meta: { role: 'all' }, component: () => import('pages/Index') },
      { path: '/pages/common', name: 'Page1', meta: { role: 'admin' }, component: () => import('pages/Index') },
      { path: '/pages/contact', name: 'Page2', meta: { role: 'staff' }, component: () => import('pages/Index') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
