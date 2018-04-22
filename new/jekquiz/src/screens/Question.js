import React from 'react'
import { parse } from 'query-string'
import player1 from '../images/team_logo_1.png'
import player2 from '../images/team_logo_2.png'
import player3 from '../images/team_logo_3.png'
import player4 from '../images/team_logo_4.png'

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

const Question = (props) => {
  const params = parse(props.location.search)

  return (
    <section style={styles.section}>
      <div style={styles.countdown_div}>
        <h1 style={styles.countdown}>01:00</h1>
      </div>

      <h2 style={styles.question}>Pergunta</h2>

      <div style={styles.answers_div}>
        <div style={{ ...styles.answer, background: '#0E94AA' }}>Resposta 1</div>
        <div style={{ ...styles.answer, background: '#DB9405' }}>Resposta 2</div>
        <div style={{ ...styles.answer, background: '#71C114' }}>Resposta 3</div>
        <div style={{ ...styles.answer, background: '#F4D30F' }}>Resposta 4</div>
      </div>

      <div style={styles.players_div}>
        <img src={player1} height="140" width="140"></img>
        <img src={player2} height="140" width="140"></img>
        <img src={player3} height="140" width="140"></img>
        <img src={player4} height="140" width="140"></img>
      </div>
    </section>
  )
}

export default Question