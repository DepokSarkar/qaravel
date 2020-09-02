import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  const loggedRoutes = [
    'Dashboard',
    'Page1',
    'Page2'
  ]

  Router.beforeEach((to, from, next) => {
    const authenticated = store.state.user.authenticated
    const userType = store.state.user.user_type
    const role = to.meta.role
    if (loggedRoutes.includes(to.name) && authenticated) {
      if (userType === role || role === 'all') {
        next()
      } else {
        next({ name: 'Dashboard', params: { denyed: true } })
      }
    } else if (loggedRoutes.includes(to.name) && !authenticated) {
      if (role === 'user' || role === 'all') {
        next({ name: 'Login.user' })
      } else if (role === 'staff') {
        next({ name: 'Login.staff' })
      } else if (role === 'admin') {
        next({ name: 'Login.admin' })
      }
    } else {
      next()
    }
  })
  return Router
}
