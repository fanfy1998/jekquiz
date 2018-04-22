import React from 'react'
import team_logo_1 from '../images/team_logo_1.png'
import team_logo_2 from '../images/team_logo_2.png'
import team_logo_3 from '../images/team_logo_3.png'
import team_logo_4 from '../images/team_logo_4.png'
import color_label_1 from '../images/color_label_1.png'
import color_label_2 from '../images/color_label_2.png'
import color_label_3 from '../images/color_label_3.png'
import color_label_4 from '../images/color_label_4.png'

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

const team = (team_logo, color_label, team_name) => {
  const div_style = { display: "flex", flexDirection: "column" }

  const label_style = { marginTop: "3em" }

  const name_style = { fontSize: "2em", textAlign: "center" }

  return (
    <div style={div_style}>
      <img src={team_logo} alt="team 1" height="140" width="140"></img>

      <img style={label_style} src={color_label} alt="blue label" height="50" width="140"></img>

      <p style={name_style}>{team_name}</p>
    </div>
  )
}

const PickCharacter = () => (
  <section style={styles.section}>
    <h1 style={styles.title}>Choose a Drink and lets see who loses first:</h1>

    <div style={styles.team_logos_section}>
      { team(team_logo_1, color_label_1, "Team 1") }

      { team(team_logo_2, color_label_2, "Team 2") }

      { team(team_logo_3, color_label_3, "Team 3") }
      
      { team(team_logo_4, color_label_4, "Team 4") }
      </div>

    <h3 style={{ ...styles.title, fontSize: "1.25em" }}>
      Select with the buzz buttons the icon you want for your team
    </h3>
  </section>
);

export default PickCharacter