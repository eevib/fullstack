import loginService from '../services/login'
import storage from '../utils/storage'

const noLoggedUser = { username: '', password: '' }
const userReducer = (state=noLoggedUser, action) => {
  switch(action.type) {
  case('LOGIN'):
    return action.data
  case('LOGOUT'):
    return null
  case('GET_USER'):
    return action.data

  default: return state
  }

}
export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    storage.saveUser(user)
    dispatch({
      type: 'LOGIN',
      data: JSON.stringify(user)
    })
    return user
  }
}
export const logout = () => {
  return async dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT'
    })
  }
}
export const getUser = () => {
  return async dispatch => {
    const user = await storage.loadUser()
    if(user) {
      dispatch({
        type: 'GET_USER',
        data: {
          token: user.token,
          username: user.username,
          name: user.name
        }
      })
    }
  }
}

export default userReducer