
const reducer = (state = null, action) => {
  switch (action.type) {
    case('NOTIFICATION'): 
      return action.data.text
    case('CLEAR_NOTIFICATION'):
      return null
    default: return state
  }
       
}
let timeOutID
export const setNotification = (notification, time) => {
  clearTimeout(timeOutID)
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        text: notification
      }    
  })
  timeOutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  
  }
}
export default reducer