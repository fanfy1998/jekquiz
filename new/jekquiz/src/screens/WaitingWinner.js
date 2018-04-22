import React from 'react'

const styles = {
  section: {
    background: '#E58442',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%'
  },
  div: {
    fontSize: '1.5em',
    alignItems: 'center',
    color: 'black',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    marginTop: '0px'
  }
}

const WaitingWinner = () => (
  <section style={styles.section}>
    <div style={styles.div}>
      <h2> And the winner is....</h2>
    </div>
  </section>
)

export default WaitingWinner