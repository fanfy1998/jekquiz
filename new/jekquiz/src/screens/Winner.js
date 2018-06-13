import React from 'react'
import { connect } from 'react-redux'

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

const Winner = (props) => {
  let labeled_scores = props.scores.map((score, team) => ({ team, score }))

  labeled_scores = labeled_scores.sortBy(labeled_score => labeled_score.score).reverse()

  let winner

  switch(labeled_scores.get(0).team) {
    case 0:
      winner = player1_wins
      break
    case 1:
      winner = player2_wins
      break
    case 2:
      winner = player3_wins
      break
    case 3:
      winner = player4_wins
      break
  }

  setTimeout(() => { props.history.push('/home') }, 5000)

  return (
    <section style={styles.section}>
      <div style={styles.title}>
        <h2>Team 2!!</h2>
      </div>

      <div style={styles.image}>
        <img src={winner} height="440" width="440"></img>
      </div>
    </section>
  )
}

const mapStateToProps = state => ({
  scores: state.reducer.scores
})

export default connect(mapStateToProps)(Winner)