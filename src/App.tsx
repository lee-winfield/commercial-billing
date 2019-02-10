import * as React from 'react'
import './App.css'
import BillingPage from './components/BillingPage'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Logo from './components/Logo'


const App = () => (
  <div className="App">
    <Router>
      <div>
        <Navbar />
        <div className='app-body'>
          <Logo />
          <Route exact path="/" component={BillingPage} />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  </div>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);


export default App;