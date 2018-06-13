import React from 'react'
import { connect } from 'react-redux'

import player1 from '../images/team_logo_1.png'
import player2 from '../images/team_logo_2.png'
import player3 from '../images/team_logo_3.png'
import player4 from '../images/team_logo_4.png'

import actions from '../actions'

const styles = {
  section: {
    backgroundColor: '#F79839',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%'
  },
  countdown_div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: '50px',
    marginTop: '15px'
  },
  countdown: {
    fontFamily: 'Inconsolata',
    fontSize: '2em',
    border: '3px solid black',
    borderRadius: '5px',
    padding: '5px 25px',
    margin: '0px'
  },
  question: {
    display: 'flex',
    fontSize: '2.75em',
    justifyContent: 'flex-start',
    margin: '15px 50px'
  },
  answers_div: {
    height: '32%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '40px',
    marginLeft: '48px'
  },
  answer: {
    color: 'black',
    marginBottom: '10px',
    width: '70vw',
    padding: '10px 25px',
  },
  players_div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '68px',
    marginRight: '20vw'
  }
}

class Question extends React.Component {
  state = {
    timer: 60
  }

  store = {
    answered: [false, false, false, false],
    timeout: null,
    buzzEventHandler: null,
    question: null
  }

  componentWillMount() {
    let question = this.props.questions.get(this.props.current_question)
    if (this.props.current_question === 2) question = undefined
    if (question === undefined) {
      question = { question: '', answers: ['', '', '', ''] }
      this.props.history.push('/suspense')
    }
    this.store.question = question
  }

  componentWillUnmount() {
    this.props.next_question()
  }

  componentDidMount() {
    const buzzEventHandler = this.buzzEventHandler.bind(this)
    window.addEventListener('buzz', buzzEventHandler)
    this.store.timeout = setTimeout(this.update_timer.bind(this), 1000)

    this.store.buzzEventHandler = buzzEventHandler
  }

  componentDidUpdate(prevState) {
    if (this.state.timer === 0) {
      window.removeEventListener('buzz', this.store.buzzEventHandler)
      clearTimeout(this.store.timeout)
      this.props.history.push('/scores')
    }
    else if (prevState.timer !== this.state.timer && this.state.timer !== 0) {
      this.store.timeout = setTimeout(this.update_timer.bind(this), 1000)
    }

    if (!this.store.answered.includes(false)) {
      this.setState(state => ({ ...state, timer: 0  }))
    }
  }

  buzzEventHandler(ev) {
    const color = ev.detail.substring(0, ev.detail.length - 1)
    const team = parseInt(ev.detail[ev.detail.length - 1], 10)

    if (color === 'buzz' || this.store.answered[team]) return

    let answer

    switch(color) {
      case 'blue':
        answer = 0
        break
      case 'orange':
        answer = 1
        break
      case 'green':
        answer = 2
        break
      case 'yellow':
        answer = 3
        break
    }

    this.store.answered[team] = true
    this.props.answer_question(team, answer)
  }

  update_timer() {
    this.setState(state => ({ ...state, timer: this.state.timer - 1 }))
  }

  render_team(team) {
    if (this.store.answered[team]) return

    let src

    switch (team) {
      case 0:
        src = player1
        break;
      case 1:
        src = player2
        break;
      case 2:
        src = player3
        break;
      case 3:
        src = player4
        break;
    }

    return (<img src={src} height="140" width="140"></img>)
  }

  render() {
    return (
      <section style={styles.section}>
        <div style={styles.countdown_div}>
          <h1 style={styles.countdown}>{this.state.timer}</h1>
        </div>

        <h2 style={styles.question}>{this.store.question.question}</h2>

        <div style={styles.answers_div}>
          <div style={{ ...styles.answer, background: '#0E94AA' }}>{this.store.question.answers[0]}</div>
          <div style={{ ...styles.answer, background: '#DB9405' }}>{this.store.question.answers[1]}</div>
          <div style={{ ...styles.answer, background: '#71C114' }}>{this.store.question.answers[2]}</div>
          <div style={{ ...styles.answer, background: '#F4D30F' }}>{this.store.question.answers[3]}</div>
        </div>

        <div style={styles.players_div}>
          { this.render_team(0) }
          { this.render_team(1) }
          { this.render_team(2) }
          { this.render_team(3) }
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.reducer.picked_questions,
  current_question: state.reducer.current_question
})

const mapDispatchToProps = dispatch => ({
  answer_question: (team, answer) => dispatch(actions.answer_question(team, answer)),
  next_question: () => dispatch(actions.next_question())
})

export default connect(mapStateToProps, mapDispatchToProps)(Question)