import React from 'react'
import player1 from '../images/team_logo_1.png'
import player2 from '../images/team_logo_2.png'
import player3 from '../images/team_logo_3.png'
import player4 from '../images/team_logo_4.png'

const styles = {
  section: {
    background: '#F4BD37',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%'
  },
  title: {
    display: 'flex',
    fontSize: '2em',
    justifyContent: 'flex-start',
    marginTop: '2vh',
    marginLeft: '10vw'
  },
  ranking: {
    fontSize: '2em',
    color: 'whitesmoke',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2vh'
  },
  players_div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2vh'
  },
  points: {
    fontSize: '1.5em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2vh'
  }
}

const Scores = () => (
  <section style={styles.section}>
    <div style={styles.title}>
      <h2>Results</h2>
    </div>

    <div style={styles.ranking}>
      <p>1º</p>
      <p>2º</p>
      <p>3º</p>
      <p>4º</p>
    </div>

    <div style={styles.players_div}>
      <img src={player1} height="140" width="140"></img>
      <img src={player2} height="140" width="140"></img>
      <img src={player3} height="140" width="140"></img>
      <img src={player4} height="140" width="140"></img>
    </div>
    
    <div style={styles.points}>
      <p>0 points</p>
      <p>20 points</p>
      <p>10 points</p>
      <p>0 points</p>
    </div>
  </section>
)

export default Scores