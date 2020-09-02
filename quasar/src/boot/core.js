import core from '../services/core'
import api from '../services/api'

export default async ({
  Vue,
  store
}) => {
  console.log('process.env.MODE', process.env.MODE)
  console.log('process.env.API_URL', process.env.API_URL)
  store.commit('user/Token', api.getToken())
  Vue.prototype.$core = core
  Vue.prototype.$api = api
  core.Vue = new Vue()
  console.core((process.env.DEV ? 'Development' : 'Production'))
  console.core('Loading services..')
}
