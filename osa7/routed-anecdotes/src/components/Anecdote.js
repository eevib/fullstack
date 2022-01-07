import {
  useParams
  } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === id)
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <div>has {anecdote.votes} votes</div>
        <div>for more info see  
          <a href={anecdote.info}> {anecdote.info}</a>
        </div>
  
      </div>
    )
  }
  export default Anecdote