import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote) 
      
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    
    case 'INIT_ANECDOTES':
      return action.data

    default: return state
    }

}
export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })

  }
}
export const anecdoteVote = (id, anecdote) => {
  return async dispatch => {
    await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: {
      id: id 
      }
    })
    
  }
}
export const createNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log('new ' + newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote.content,
        votes: 0,
        id: newAnecdote.id
    } 
    })
    
  }
}

export default anecdoteReducer