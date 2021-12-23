import React from "react"
import { createNew } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {  
  const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createNew(content)
        props.setNotification(`you added ${content}`, 5)
      }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
      <p></p>
    </div>
  )
}

const mapDispatchToProps = {
    createNew, setNotification
}
export default connect(
    null,
    mapDispatchToProps
) (AnecdoteForm)