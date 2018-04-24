import React from 'react'
import { connect } from 'react-redux'

import background from '../images/home.png'

import { load_questions } from '../helpers'
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
    is_loading: true
  }

  componentDidMount() {
    load_questions(this.props.add_question.bind(this)).then(() => {        
      this.setState(state => { return { ...state, is_loading: false } })
    })
  }

  componentDidUpdate() {
    window.document.onkeydown = this.buttonPress.bind(this)
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  buttonPress(ev) {
    console.log(ev);
    
    if (ev.type === 'keydown' && !['Enter', ' '].includes(ev.key)) return
    this.props.history.push('/pick_characters')
  }

  render() {    
    return (
      <section style={styles.section}>
        <div>
          <h1 style={styles.h1}>jeKquiz</h1>
          { this.render_text(this.state.is_loading) }
        </div>
      </section>
    )
  }

  render_text(is_loading) {
    if (is_loading) {
      return (
        <p style={styles.p} onClick={this.buttonPress.bind(this)}>Loading questions ...</p>
      )
    }
    else {
      return (
        <p style={styles.p} onClick={this.buttonPress.bind(this)}>Press Buzz to start</p>
      )
    }
  }
}

const mapStateToProps = state => ({
  questions: state.questions
})

const mapDispatchToProps = dispatch => ({
  add_question: question => dispatch(actions.add_question(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)