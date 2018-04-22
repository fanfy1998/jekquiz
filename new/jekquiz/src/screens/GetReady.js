import React from 'react'
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

const GetReady = () => (
  <section style={styles.section}>
    <div style={styles.title_div}>
      <h1>Raise your glasses guys!<br/>This is about to start!</h1>
    </div>
    
    <div style={styles.images_div}>
      <img src={team_logo_1} height="140" width="140"></img>
      <img src={team_logo_2} height="140" width="140"></img>
      <img src={team_logo_3} height="140" width="140"></img>
      <img src={team_logo_4} height="140" width="140"></img>
    </div>
  </section>
)

export default GetReady;