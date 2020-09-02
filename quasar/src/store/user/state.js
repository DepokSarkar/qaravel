import Api from '../../services/api'

const token = Api.getToken()
const userType = Api.userType()
var auth = false
if (token) {
  auth = true
}

export default function () {
  return {
    token: token || {},
    authenticated: auth || false,
    user_type: userType || 'user',
    current_user: {}
  }
}
