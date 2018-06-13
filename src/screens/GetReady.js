import React from 'react'
import { connect } from 'react-redux'

import team_logo_1 from '../images/team_logo_2_1.png'
import team_logo_2 from '../images/team_logo_2_2.png'
import team_logo_3 from '../images/team_logo_2_3.png'
import team_logo_4 from '../images/team_logo_2_4.png'

const styles = {
  section: {
    backgroundColor: '#56D6C9',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%'
  },
  title_div: {
    display: 'flex',
    fontSize: '2.0em',
    justifyContent: 'center',
    marginTop: '30px',
    textAlign: 'center'
  },
  images_div: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '120px 100px'
  }
}

class GetReady extends React.Component {
  state = {
    timer: 3
  }

  componentDidUpdate() {
    if(this.state.timer === 0) {
      this.props.history.push('/question')
    }
    else {
      setTimeout(this.update_timer.bind(this), 1000)
    }
  }

  componentDidMount() {
    setTimeout(this.update_timer.bind(this), 1000)
  }

  update_timer() {
    this.setState(state => ({ ...state, timer: this.state.timer - 1 }))
  }

  render_team(color) {
    const index = this.props.team_colors.indexOf(color)
    
    return (<p>Team {index}</p>)
  }

  render() {
    return (
      <section style={styles.section}>
        <div style={styles.title_div}>
          <h1>Raise your glasses guys!<br/>This is about to start!</h1>
          <p>{this.state.timer}</p>
        </div>
        
        <div style={styles.images_div}>
          { this.render_team('blue') }
          <img src={team_logo_1} height="140" width="140"></img>
          { this.render_team('orange') }
          <img src={team_logo_2} height="140" width="140"></img>
          { this.render_team('green') }
          <img src={team_logo_3} height="140" width="140"></img>
          { this.render_team('yellow') }
          <img src={team_logo_4} height="140" width="140"></img>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  team_colors: state.reducer.team_colors
})

export default connect(mapStateToProps)(GetReady)