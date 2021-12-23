import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  const getAll = () => {
    return store.getState().good + store.getState().bad + store.getState().ok
  }
  const average = () => {
    if(getAll() === 0) return 0
    
    return (store.getState().good - store.getState().bad)/getAll()
  }
  const positive = () => {
    if(getAll() === 0) return 0

    return (store.getState().good/ getAll()) * 100 
  }
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <h2>statistics</h2>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>all {getAll()}</div>
      <div>average {average()}</div>
      <div>positive {positive()} %</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
