const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case('SET_NOTIFICATION'):
    return action.data
  case('CLEAR_NOTIFICATION'):
    return null
  default: return state
  }
}

let timeOutId
export const setNotification = (content, style='success', time=5) => {
  clearTimeout(timeOutId)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content,
        style
      }
    })
    timeOutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}
export default notificationReducer