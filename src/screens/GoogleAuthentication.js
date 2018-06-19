import React from 'react'
import Home from './Home'

class GoogleAuthentication extends React.Component {
  componentWillMount() {
    window.gapi_loaded = new Promise((res, rej) => {
      const script = window.document.createElement('script')
      script.async = true
      script.defer = true
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = () => {
        window.gapi.load("client:auth2", function () {
          window.gapi.auth2.init({ client_id: '1050471802592-13ckl4m7p66ehqgr6982d6vdie10tnq5.apps.googleusercontent.com' });
          authenticate().then(loadClient).then(() => res())
        });

        function authenticate() {
          return window.gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly" })
            .then(function () { console.log("Sign-in successful") },
              function (err) { console.error("Error signing in", err) })
        }

        function loadClient() {
          return window.gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest")
            .then(function () { console.log("GAPI client loaded for API") },
              function (err) { console.error("Error loading GAPI client for API", err) })
        }
      }

      window.document.body.appendChild(script)
    })
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <Home history={this.props.history}/>
      </div>
    )
  }
}

export default GoogleAuthentication