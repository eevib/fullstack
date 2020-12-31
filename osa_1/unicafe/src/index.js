import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if(total === 0) {
    return (
      <div>No feedback given</div>   
    )   
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />  
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={(props.good-props.bad)/total} />
      <StatisticLine text="positive" value={props.good/total*100} />    
    </div>
  )
}
const StatisticLine = (props) => {
  if(props.text==="positive") {
    return (
      <div>
        {props.text} {props.value} % <br></br>
      </div>
    )
  }
  return (
    <div>
      {props.text} {props.value} <br></br>
    </div>
  )
}

const App = () => {
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
const Button = (props) => {
  return (
  <button onClick={props.handleClick}>{props.text}</button>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
