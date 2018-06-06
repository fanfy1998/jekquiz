import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import background from '../images/home.png'

import { load_questions, pick_questions } from '../helpers'
import actions from '../actions'
import { BuzzController } from '../objects';

const styles = {
  section: {
    backgroundImage: "url(" + background + ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  h1: {
    color: "#7CCCED",
    fontSize: "8em",
    fontFamily: "Athens",
    textAlign: "center",
    marginTop: "0"
  },
  p: {
    color: "white",
    fontSize: "3em",
    textAlign: "center",
    animation: "blink 3s infinite"
  }
}

class Home extends React.Component {
  state = {
    is_loading: true,
    socket: null
  }

  componentDidMount() {
    load_questions(this.props.add_question.bind(this))
      .then(() => {        
        pick_questions(this.props.pick_question.bind(this), this.props.questions)

        let socket = io('http://localhost:3001')
        socket.on('connect', () => {
          socket.on('buzz_connection', ev => {
            if (!ev.success) {
              alert(ev.message)
              socket.emit('reconnect_buzz')
            }
          })
        })

        this.setState(state => { return { is_loading: false, socket } })
      })
  }

  buttonPress(ev) {    
    if (ev.type === 'keydown' && !['Enter', ' '].includes(ev.key)) return
    this.props.history.push('/pick_characters')
  }

  render() {    
    return (
      <section style={styles.section}>
        <div>
          <h1 style={styles.h1}>jeKquiz</h1>
          <p style={styles.p}>{this.state.is_loading ? "Loading questions ..." : "Press Buzz to start"}</p>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  questions: state.question_reducer.questions
})

const mapDispatchToProps = dispatch => ({
  add_question: question => dispatch(actions.add_question(question)),
  pick_question: question => dispatch(actions.pick_question(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)