import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({header}) => <h1>{header}</h1>

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const all = (...args) => 
{ //sums arguments
  let sum = 0;
  for (let index = 0, length = args.length; index < length; index++) 
  {
    sum += args[index]
  }
  return sum;
}

const average = (good, neutral, bad) => 
{
  return ((good + (bad * -1)) / all(good, neutral, bad)).toFixed(2)
}

const positive = (good, neutral, bad) =>  
{
    return ((good / all(good, neutral, bad) )*100).toFixed(2) 
}


const Statistics = ({good, neutral, bad}) =>
{
  if (all(good, neutral, bad) === 0) { //if return is greater than 0 then we know there's at least 1 value present, so we're not divding by 0
    return <p>No feedback given</p>
  } else {
    return(
      <table>
        <tbody>
          <Statistic text={'Good'} value={good} />
          <Statistic text={'Neutral'} value={neutral} />
          <Statistic text={'Bad'} value={bad} />
          <Statistic text={'All'} value={all(good, neutral, bad)} />
          <Statistic text={'Average'} value={average(good, neutral, bad)} />
          <Statistic text={'Positive'} value={positive(good, neutral, bad) + '%'} />
        </tbody>
      </table>
    )
  }
}


const Button = ({text, onClickHandler}) => <button onClick={onClickHandler}>{text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header1 = 'Give Feedback';
  const header2 = 'Statistics';

  const goodButton = 
  {
    text: 'Good', 
    onClickHandler:() => setGood(good + 1) 
  } 
  const neutralButton = 
  {
    text: 'Neutral', 
    onClickHandler:() => setNeutral(neutral + 1)
  }
  const badButton = 
  {
    text: 'Bad', 
    onClickHandler:() => setBad(bad + 1)
  };
  
  return (
    <div>
      <Header header={header1} />
      <Button text={goodButton.text} onClickHandler={goodButton.onClickHandler} />
      <Button text={neutralButton.text} onClickHandler={neutralButton.onClickHandler} />
      <Button text={badButton.text} onClickHandler={badButton.onClickHandler} />
      <Header header={header2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)