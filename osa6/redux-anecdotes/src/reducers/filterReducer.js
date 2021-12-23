
const reducer = (state = '', action) => {
    switch(action.type) {
      case('FILTER'):
        return action.data.filter

      default: return state        
    }
}
export const filt = (filter) => {
  return {
      type: 'FILTER',
      data: {
       filter: filter
      }
    }
}

export default reducer