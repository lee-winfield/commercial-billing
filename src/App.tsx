import * as React from 'react'
import './App.css'
import LandingPage from './LandingPage'

import logo from './logo.svg'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Claudia's Billing Center</h1>
        </header>
        <LandingPage />
      </div>
    );
  }
}

export default App;
