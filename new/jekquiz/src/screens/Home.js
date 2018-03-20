import React from 'react'
import '../animations.css'

const styles = {
  section: {
    backgroundImage: "url('images/home.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  },
  h1: {
    color: "#7CCCED",
    fontSize: "5.5em",
    fontFamily: "Permanent Marker",
    textAlign: "center",
    marginTop: "0"
  },
  p: {
    color: "white",
    fontSize: "1.5em",
    fontFamily: "Permanent Marker",
    textAlign: "center",
    animation: "blink 3s infinite"
  }
}

class Home extends React.Component {
  componentWillMount() {
    document.onkeydown = this.buttonPress.bind(this);
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  buttonPress(ev) {
    if (ev.type === 'keydown' && !['Enter', ' '].includes(ev.key)) return
    this.props.history.push('/characters')
  }

  render() {
    return (
      <section style={styles.section}>
        <div>
          <h1 style={styles.h1}>jeKquiz</h1>
          <p style={styles.p} onClick={this.buttonPress.bind(this)}>Press Buzz to start</p>
        </div>
      </section>
    )
  }
}

export default Home