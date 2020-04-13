import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRandomIntegerMinInclusive = (min, max, selected) =>
{
  min = Math.ceil(min);
  max = Math.floor(max);
  let newInt = Math.floor(Math.random() * (max - min)) + min;
  return (newInt === selected) ? getRandomIntegerMinInclusive(min, max) : newInt //make sure to generate a new integer 
}

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]); //each index represent value in 'anecdotes'
  let highetsVotes = 0;

  const updateVotes = () =>
  {
    const copyOfVotes = [...votes]; //for complex states, React recommends making a copy instead of directly modifying
    copyOfVotes[selected] += 1;     //index 'selected' represents the current displayed anecdote
    setVotes(copyOfVotes)
  }
  
  const getAnecdote = () =>
  { //returns the value of 'anecdotes' with the highest votes based off 'votes'
    highetsVotes = Math.max(...votes)
    return anecdotes[votes.indexOf(highetsVotes)]
  }

  const randomAnecdoteButton = 
  {
    text: 'Next Anecdote',
    onClickHandler: () =>  setSelected(selected * 0 + getRandomIntegerMinInclusive(0, 6, selected)) //update selected to an integer between 0-5
  }

  const voteButton =
  {
    text: 'vote',
    onClickHandler: updateVotes
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Button text={randomAnecdoteButton.text} clickHandler={randomAnecdoteButton.onClickHandler} />
      <Button text={voteButton.text} clickHandler={voteButton.onClickHandler} />
      <p>{props.anecdotes[selected]}</p>
      <h2>Anecdote with most votes</h2>
      <p>{getAnecdote()}<br></br>has {highetsVotes} votes</p>
    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)