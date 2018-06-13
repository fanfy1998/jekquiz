import React from 'react'
import { connect } from 'react-redux'

import team_logo_1 from '../images/team_logo_1.png'
import team_logo_2 from '../images/team_logo_2.png'
import team_logo_3 from '../images/team_logo_3.png'
import team_logo_4 from '../images/team_logo_4.png'
import color_label_1 from '../images/color_label_1.png'
import color_label_2 from '../images/color_label_2.png'
import color_label_3 from '../images/color_label_3.png'
import color_label_4 from '../images/color_label_4.png'

import actions from '../actions'

const styles = {
  section: {
    backgroundColor: "#7CCCED",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  title: {
    alignItems: "center",
    color: "black",
    display: "flex",
    justifyContent: "center",
    paddingTop: "10px",
    width: "100%",
    fontSize: "2.75em"
  },
  team_logos_section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "45px 190px 0"
  },
  team_logo: {
    height: "100px",
    width: "230px"
  }
}

class PickCharacter extends React.Component {
  state = {
    buzzEventHandler: null
  }

  componentDidMount() {
    let buzzEventHandler = this.buzzEventHandler.bind(this)
    window.addEventListener('buzz', buzzEventHandler)

    this.setState(state => ({ buzzEventHandler }))
  }

  buzzEventHandler(ev) {
    const color = ev.detail.substring(0, ev.detail.length-1)
    const team = parseInt(ev.detail[ev.detail.length-1], 10)

    if (color === 'buzz') return

    const team_color = this.props.team_colors.indexOf(color)
    if (team_color === -1) {
      this.props.pick_team_color(team, color)

      if(this.props.team_colors.indexOf(undefined) === -1) {
        window.removeEventListener('buzz', this.state.buzzEventHandler)
        this.props.history.push('/get_ready')
      }
    }
  }

  render_team_color(team_logo, color_label, color) {
    const div_style = { display: "flex", flexDirection: "column" }
    const label_style = { marginTop: "3em" }
    const name_style = { fontSize: "2em", textAlign: "center" }
    const color_index = this.props.team_colors.indexOf(color)

    const render_team_name = () => {
      if(color_index !== -1) return (<p style={name_style}>Team {color_index}</p>)
    }

    return (
      <div style={div_style}>
        <img src={team_logo} height="140" width="140"></img>

        <img style={label_style} src={color_label} alt="blue label" height="50" width="140"></img>

        { render_team_name() }
      </div>
    )
  }

  render_timer() {
    if (this.state.render_timer) {
      return (<p style={{ fontSize: "2em" }}>{this.state.timer}</p>)
    }
  }

  render() {
    return (
      <section style={styles.section}>
        { this.render_timer() }

        <h1 style={styles.title}>Choose a Drink and lets see who loses first:</h1>

        <div style={styles.team_logos_section}>
          { this.render_team_color(team_logo_1, color_label_1, 'blue') }

          { this.render_team_color(team_logo_2, color_label_2, 'orange') }

          { this.render_team_color(team_logo_3, color_label_3, 'green') }
          
          { this.render_team_color(team_logo_4, color_label_4, 'yellow') }
          </div>

        <h3 style={{ ...styles.title, fontSize: "1.25em" }}>
          Select with the buzz buttons the icon you want for your team
        </h3>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  team_colors: state.reducer.team_colors
})

const mapDispatchToProps = dispatch => ({
  pick_team_color: (team, color) => dispatch(actions.pick_team_color(team, color)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PickCharacter)