import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)
        const updatedAnecdote = {
            content: anecdote.content,
            id: anecdote.id,
            votes: anecdote.votes + 1
        }
        dispatch(anecdoteVote(id, updatedAnecdote))
        dispatch(setNotification(`you voted '${updatedAnecdote.content}'`, 5))
      }

  return (
    <div>
      {anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}
export default AnecdoteList