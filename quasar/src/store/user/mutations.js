const currentUser = (state, user) => {
  state.current_user = user
}
const Token = (state, token) => {
  state.token = token
}
const Authenticated = (state, status) => {
  state.authenticated = status
}
const userType = (state, type) => {
  state.user_type = type
}

export {
  currentUser,
  Token,
  Authenticated,
  userType
}
