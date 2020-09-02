import core from '../services/core'
import api from '../services/api'

export default async ({
  Vue,
  store
}) => {
  store.commit('user/Token', api.getToken())
  Vue.prototype.$core = core
  Vue.prototype.$api = api
  core.Vue = new Vue()
  console.core((process.env.DEV ? 'Development' : 'Production'))
  console.core('Loading services..')
}
