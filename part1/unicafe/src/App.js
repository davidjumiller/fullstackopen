import { useState } from 'react'

const Feedback = ({increaseGood, increaseNeutral, increaseBad}) => {

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all < 1) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={all}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive + " %"}/>
          </tbody>
        </table>
      </div>
    )
  }
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const increaseGood = () => { 
    setGood(good+1);
    setAll(all+1);
    setAverage((good+1 - bad) / (all+1));
    setPositive((good+1)/(all+1)*100);
  }
  const increaseNeutral = () => {
    setNeutral(neutral+1);
    setAll(all+1);
    setAverage((good - bad) / (all+1));
    setPositive((good)/(all+1)*100);
  }
  const increaseBad = () => {
    setBad(bad+1);
    setAll(all+1);
    setAverage((good - (bad+1)) / (all+1));
    setPositive((good)/(all+1)*100);
  }

  return (
    <div>
      <Feedback increaseGood={increaseGood} increaseNeutral={increaseNeutral} increaseBad={increaseBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App