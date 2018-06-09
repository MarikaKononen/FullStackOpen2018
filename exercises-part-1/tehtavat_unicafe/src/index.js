import React from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => {
  return (
    <div>
      <h1> {props.otsikko} </h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = (props) => {
  return (
    <React.Fragment>
      <td>{props.name}</td>
      <td>{props.result}</td>
    </React.Fragment>
  )
}

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <tr><Statistic name={props.feedbacks[0].name} result={props.feedbacks[0].result}/></tr>
        <tr><Statistic name={props.feedbacks[1].name} result={props.feedbacks[1].result}/></tr>
        <tr><Statistic name={props.feedbacks[2].name} result={props.feedbacks[2].result}/></tr>
        <tr><Statistic name={props.feedbacks[3].name} result={props.ka}/></tr>
        <tr><Statistic name={props.feedbacks[4].name} result={props.posPros}/></tr>
      </tbody>
    </table>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      otsikko_pal: 'Anna palautetta',
      otsikko_stat: 'Statistiikka',
      otsikko_tyhja: 'Ei yhtään palautetta annettu',
      kaikki: [],
      feedbacks: [
        {
          name: 'Hyvä',
          result: 0
        },
        {
          name: 'Neutraali',
          result: 0
        },
        {
          name: 'Huono',
          result: 0
        },
        {
          name: 'Keskiarvo',
          result: 0
        },
        {
          name: 'Positiivisia',
          result: 0
        }
      ]
    }  
  }

asetaArvoon = (btn) => {
  return () => {
    console.log('asetaArvoon')
    let stateObj = Object.assign({}, this.state);
    console.log('stateObj', stateObj) 
    stateObj.feedbacks[btn].result = stateObj.feedbacks[btn].result + 1;
    this.setState({stateObj});
    stateObj.kaikki.push(btn)
    this.setState({stateObj});
    console.log('kaikki',this.state.kaikki)
    console.log('stateObj', stateObj)

  }
}


laskePosPros = () => {
  const kokonais_lkm = this.state.feedbacks[0].result + this.state.feedbacks[1].result + this.state.feedbacks[2].result
  console.log('kokonaisLkm', kokonais_lkm)
  const vastausPalPros =  (this.state.feedbacks[0].result / kokonais_lkm)*100
  const posPalProsentti = vastausPalPros.toFixed(1)
  const pros = ' %'
  const result = posPalProsentti.concat(pros)
  console.log('vastausPalPros', vastausPalPros)
  return result
}
laskeKA = () => {
  const kokonais_lkm = this.state.feedbacks[0].result + this.state.feedbacks[1].result + this.state.feedbacks[2].result
  const kerroinHyva = 1
  const kerroinNeutr = 0
  const kerroinHuono = -1
  const kokonaisLkm_kerroin = (kerroinHyva*this.state.feedbacks[0].result) + (kerroinNeutr*this.state.feedbacks[1].result) + (kerroinHuono*this.state.feedbacks[2].result)
  const vastausKA = kokonaisLkm_kerroin / kokonais_lkm
  const ka = vastausKA.toFixed(1)
  console.log('vastausKA', ka)
  return ka
} 

  render() {
    const checkFeedback = () => {
      if (this.state.kaikki.length === 0) {
        return (
          <div>
            <p> {this.state.otsikko_tyhja} </p>
          </div>    
        )
      }
      return (
        <div>
          <Statistics feedbacks = {this.state.feedbacks} ka = {this.laskeKA()} posPros = {this.laskePosPros()} />
        </div>
        )  
    }
    return (
      <div>
        <Title otsikko={this.state.otsikko_pal} />
        <Button
            handleClick={this.asetaArvoon(0)}
            text= {this.state.feedbacks[0].name}
          />
          <Button
            handleClick={this.asetaArvoon(1)}
            text= {this.state.feedbacks[1].name}
          />
          <Button
            handleClick={this.asetaArvoon(2)}
            text= {this.state.feedbacks[2].name}
          />  
        <Title otsikko={this.state.otsikko_stat} />
        <div>{checkFeedback()}</div>
      </div>
    )
   
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)