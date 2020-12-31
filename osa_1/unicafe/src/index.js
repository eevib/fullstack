import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good +1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad +1)} text="bad"/>
      <h1>statistics</h1>
      good {good} <br></br>
      neutral {neutral} <br></br>
      bad {bad} <br></br>
      <Total good={good} neutral={neutral} bad={bad}/>
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
const Button = (props) => {
  return (
  <button onClick={props.handleClick}>{props.text}</button>
  )
}
const Average=(props) => {
  const total = props.good + props.neutral + props.bad
  if(total == 0) {
    return <p>average</p>
  }
  return (
    <div>
      average {(props.good - props.bad)/total}
    </div>
    )
}

const Total=(props) => {
  return (
  <div>
    all {props.good + props.neutral + props.bad}
  </div>
  )
}
const Positive=(props) => {
  const total = props.good + props.neutral + props.bad
  if(total == 0) {
    return <p>positive</p>
  }
  return (
  <div>
    positive {props.good/total*100} %
  </div>
  )
}
ReactDOM.render(<App />, 
  document.getElementById('root')
)
