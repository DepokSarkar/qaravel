import axios from 'axios'

const token = JSON.parse(localStorage.getItem('token'))
const userType = localStorage.getItem('user_type')

function request (type, endpoint, data, auth) {
  data = data || {}
  axios.defaults.headers.Accept = 'application/json'

  if (auth) {
    const accessToken = token.access_token
    axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
  }

  var response = {}
  switch (type) {
    case 'post':
      response = axios.post(endpoint, data)
      break
    case 'put':
      response = axios.put(endpoint, data)
      break
    case 'patch':
      response = axios.patch(endpoint, data)
      break
    case 'delete':
      response = axios.delete(endpoint, data)
      break
    default:
      response = axios.get(endpoint, data)
  }
  return response
}

const Api = {
  get (endpoint, data) {
    return request('get', endpoint, data, false)
  },
  post (endpoint, data) {
    return request('post', endpoint, data, false)
  },
  put (endpoint, data) {
    return request('put', endpoint, data, false)
  },
  patch (endpoint, data) {
    return request('patch', endpoint, data, false)
  },
  delete (endpoint, data) {
    return request('delete', endpoint, data, false)
  },
  authPost (endpoint, data) {
    data = data || {}
    return new Promise((resolve, reject) => {
      request('post', endpoint, data, true).then((response) => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  authGet (endpoint, data) {
    data = data || {}
    return new Promise((resolve, reject) => {
      request('get', endpoint, data, true).then((response) => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const Auth = {
  get (endpoint, data) {
    return request('get', endpoint, data, true)
  },
  post (endpoint, data) {
    return request('post', endpoint, data, true)
  },
  put (endpoint, data) {
    return request('put', endpoint, data, true)
  },
  patch (endpoint, data) {
    return request('patch', endpoint, data, true)
  },
  delete (endpoint, data) {
    return request('delete', endpoint, data, true)
  }
}

export default {
  getToken () {
    return token
  },
  userType () {
    return userType
  }
}

export { Api, Auth }
