import { Auth, Api } from '../../services/api'

function Login ({ commit, state }, playload) {
  return new Promise((resolve, reject) => {
    Api.post('/api/' + state.user_type + '/login', playload).then(response => {
      const user = response.data.user
      const token = response.data.token
      localStorage.setItem('token', JSON.stringify(token))
      localStorage.setItem('user_type', state.user_type)
      commit('Authenticated', true)
      commit('Token', token)
      commit('currentUser', user)
      resolve(user)
    }).catch(error => {
      localStorage.removeItem('token')
      localStorage.removeItem('user_type')
      commit('Authenticated', false)
      commit('Token', {})
      commit('currentUser', {})
      reject(error)
    })
  })
}
function Register ({ commit }, playload) {
  return new Promise((resolve, reject) => {
    Api.post('/api/register', playload).then(response => {
      const data = response.data
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}
function currentUser ({ commit, state }) {
  return new Promise((resolve, reject) => {
    Auth.post('/api/' + state.user_type + '/me').then(response => {
      const data = response.data
      commit('currentUser', data)
      resolve(data)
    }).catch(error => {
      commit('currentUser', {})
      reject(error)
    })
  })
}
function editUser ({ commit, state }, playload) {
  return new Promise((resolve, reject) => {
    Auth.post('/api/' + state.user_type + '/me', playload).then(response => {
      const data = response.data
      commit('currentUser', data)
      resolve(data)
    }).catch(error => {
      commit('currentUser', {})
      reject(error)
    })
  })
}
function Logout ({ commit, state }) {
  return new Promise((resolve, reject) => {
    Auth.post('/api/' + state.user_type + '/logout').then(response => {
      localStorage.removeItem('token')
      localStorage.removeItem('user_type')
      commit('Authenticated', false)
      commit('currentUser', {})
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export {
  Login,
  Register,
  currentUser,
  editUser,
  Logout
}
