import React from 'react'
import player1_wins from '../images/player1_wins.png'
import player2_wins from '../images/player2_wins.png'
import player3_wins from '../images/player3_wins.png'
import player4_wins from '../images/player4_wins.png'

const styles = {
  section: {
    background: '#E58442',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%'
  },
  title: {
    fontSize: '5.5em',
    color: 'black',
    marginLeft: '50px',
    marginTop: '100px'
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: '210px',
    position: 'absolute',
    width: '100%'
  }
}

const Winner = () => (
  <section style={styles.section}>
    <div style={styles.title}>
      <h2>Team 2!!</h2>
    </div>

    <div style={styles.image}>
      <img src={player1_wins} height="440" width="440"></img>
    </div>
  </section>
)

export default Winner