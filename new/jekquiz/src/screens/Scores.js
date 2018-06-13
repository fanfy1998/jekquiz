import React from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'

import player1 from '../images/team_logo_1.png'
import player2 from '../images/team_logo_2.png'
import player3 from '../images/team_logo_3.png'
import player4 from '../images/team_logo_4.png'

import actions from '../actions'

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

class Scores extends React.Component {
  store = {
    scores: null
  }

  componentWillMount() {
    const scores = List(this.props.scores)
    const labeled_scores = scores.map((score, team) => {
      return { team, score }
    })
    this.store.scores = labeled_scores.sortBy(labeled_score => labeled_score.score).reverse()
  }

  componentDidMount() {
    setTimeout(() => { this.props.history.push('/question') }, 5000)
  }

  render_team_at(index) {
    const labeled_score = this.store.scores.get(index)
    let src

    switch(labeled_score.team) {
      case 0:
        src = player1
        break
      case 1:
        src = player2
        break
      case 2:
        src = player3
        break
      case 3:
        src = player4
        break
    }

    return (<img src={src} height="140" width="140"></img>)
  }

  render_score_at(index) {
    const labeled_score = this.store.scores.get(index)

    return (<p>{labeled_score.score} points</p>)
  }

  render() {
    return (
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
          { this.render_team_at(0) }
          { this.render_team_at(1) }
          { this.render_team_at(2) }
          { this.render_team_at(3) }
        </div>
        
        <div style={styles.points}>
          { this.render_score_at(0) }
          { this.render_score_at(1) }
          { this.render_score_at(2) }
          { this.render_score_at(3) }
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  scores: state.reducer.scores,
  current_question: state.reducer.current_question
})

export default connect(mapStateToProps)(Scores)