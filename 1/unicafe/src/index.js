import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = ({props}) => {
  const {goodButton, badButton, neutralButton} = props
  return(
    <div>
      <Button props={goodButton} />
      <Button props={neutralButton} />
      <Button props={badButton} />
    </div>
  )
}
const Button = ({props}) => {
  const {text, setter} = props
  return(
    <div>
      <button onClick={setter}>{text}</button>
    </div>
  )
}

const Statistics = ({props}) => {
  const {good, neutral, bad} = props
  const count = good + bad + neutral
  const avg = (good - bad) / (count)
  const pos = good / count * 100
  return(
    <div>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>count: {count}</p>
      <p>average: {avg}</p>
      <p>positive: {pos}%</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const countGood = (i) => setGood(good + 1)
  const countNeutral = (i) => setNeutral(neutral + 1)
  const countBad = (i) => setBad(bad + 1)


  const buttonsObject = {
    goodButton: {
      text: "good",
      setter: countGood
    },
    neutralButton: {
      text: "neutral",
      setter: countNeutral
    },
    badButton: {
      text: "bad",
      setter: countBad
    }
  }
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Feedback props={buttonsObject} />
      <Statistics props={stats} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)