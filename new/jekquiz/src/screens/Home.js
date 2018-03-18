import React from 'react'

const styles = {
  section: {
    backgroundImage: "url('images/background1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%"
  },
  div: {
    color: "#7CCCED",
    display: "flex",
    fontSize: "5.5em",
    justifyContent: "center",
    paddingTop: "156px",
    fontFamily: "myFirstFont"
  }
}

const Home = () => (
  <section style={styles.section}>
    <div style={styles.div}>
      <h1>jeKquiz</h1>
    </div>
  </section>
)

export default Home;