import React from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => {
  return (
    <div>
      <h1> {props.name} </h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Result = (props) => {
  return (
    <div>
      <h1> {props.name} </h1>
      <p> {props.bestAnecdote} </p>
      <p> has {props.nbVotes} votes  </p>
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      bestAnecdote: undefined,
      bestNbVotes: undefined,
      voteBtn : 'Vote',
      nextBtn : 'Next anecdote',
      scores: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
      }
    }
    
  }

drawAnecdote = () => {
  return () => {
    console.log('drawAnecdote')
    const nbOfAnecdote = Math.floor(Math.random() * 6)
    this.setState({ selected: nbOfAnecdote })
    console.log('arvottu numero ', nbOfAnecdote)
  }
}

voteAnecdote = () => {
  return () => {
    console.log('voteAnecdote')
    const selectedAnecdote = this.state.selected

    let copyOfScores = Object.assign({}, this.state);
    console.log('stateObj', copyOfScores) 
    copyOfScores.scores[selectedAnecdote] = copyOfScores.scores[selectedAnecdote] + 1
    this.setState({copyOfScores})

    console.log('valittu numero ', selectedAnecdote)
    console.log('copyOfScores ', copyOfScores)
    console.log('0: ',this.state.scores)
    console.log('1: ', this.state.scores['1'])
    console.log('2: ',this.state.scores['2'])
    console.log('3: ',this.state.scores['3'])
    console.log('4: ',this.state.scores['4'])
    console.log('5: ',this.state.scores['5'])

    this.countBestAnecdote()

  }
}

countBestAnecdote  = () => {
    console.log('countBestAnecdote')
    let copyOfScores = Object.assign({}, this.state) 

    let sortableScores = []
    for (var nbOfAnecdote in copyOfScores.scores) {
      sortableScores.push([nbOfAnecdote, copyOfScores.scores[nbOfAnecdote]])
    }

    sortableScores.sort(function(a, b) {
        return a[1] - b[1];
    })
    
    console.log('sortableScores', sortableScores)
  
    let count = 0
    let iterator = sortableScores.entries()
    
    for (let item of iterator) {
      if (count === 5){
        console.log('item', item)
        const tmp = []
        tmp[0] = item[1][0]
        tmp[1] = item[1][1]
        copyOfScores.bestAnecdote = tmp[0]
        copyOfScores.bestNbVotes = tmp[1]
        console.log('tmp',tmp)
        console.log('copyOfScores.bestAnecdote',copyOfScores.bestAnecdote)
        console.log('copyOfScores.bestNbVotes', copyOfScores.bestNbVotes)
      }
      count++
    }
    console.log('copyOfScores...', copyOfScores)
    this.setState((prevState) => ({
      bestAnecdote: copyOfScores.bestAnecdote,
      bestNbVotes : copyOfScores.bestNbVotes
    }));
    
    console.log('this.state ', this.state)
    console.log('state.bestAnecdote', this.state.bestAnecdote)
    console.log('bestNbVotes', this.state.bestNbVotes)
}


  render() {
    const checkBestAnecdote = () => {
      if (this.state.bestAnecdote === undefined) {
        return (
          <div>
            <p> Any of the anecdote hasn't been voted  </p>
          </div>   
        )
      }
      return (
        <div>
          <Result  bestAnecdote = {this.props.anecdotes[this.state.bestAnecdote]}
                   nbVotes = {this.state.bestNbVotes} 
                 
          />
        </div>
        )  
    }
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <div>
          <div>
            <Button
                  handleClick={this.voteAnecdote()}
                  text= {this.state.voteBtn}
            /> 
            <Button
                handleClick={this.drawAnecdote()}
                text= {this.state.nextBtn}
            />
          </div>
        </div>
        <Title name = {this.props.bestAnecdoteTxt} />
        <div>{checkBestAnecdote()}</div>
        
      </div>
    )
  }
}
const bestAnecdoteTxt = 'Anecdote with most votes'
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} bestAnecdoteTxt={bestAnecdoteTxt}/>,
  document.getElementById('root')
)