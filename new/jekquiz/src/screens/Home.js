import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'

import background from '../images/home.png'

import { load_questions, pick_questions } from '../helpers'
import actions from '../actions'

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
    buzzEventHandler: null
  }

  componentDidMount() {
    load_questions(this.props.add_question.bind(this))
      .then(() => {
        pick_questions(this.props.pick_question.bind(this), this.props.questions)

        let buzzEventHandler = this.buzzEventHandler.bind(this)
        let socket = io('http://localhost:3001')
        socket.on('connect', () => {
          socket.on('buzz_connection', ev => {
            if (!ev.success) {
              alert(ev.message)
              setTimeout(() => socket.emit('reconnect_buzz'), 2000)
            }
          })
          socket.on('buzz_click', (key) => {
            window.dispatchEvent(new CustomEvent('buzz', { detail: key }))
          })
        })

        window.addEventListener('buzz', buzzEventHandler)

        this.setState(state => ({ is_loading: false, buzzEventHandler }))
      })
  }

  buzzEventHandler(ev) {  
    if (!ev.detail.includes('buzz')) return
    window.removeEventListener('buzz', this.state.buzzEventHandler)
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
  questions: state.reducer.questions
})

const mapDispatchToProps = dispatch => ({
  add_question: question => dispatch(actions.add_question(question)),
  pick_question: question => dispatch(actions.pick_question(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)