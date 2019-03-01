import * as React from 'react'
import './App.css'
import BillingPage from './components/BillingPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import styled from 'styled-components'


const App = () => (
  <>
    <Navbar />
    <div className='app-body'>
      <Router>
        <Switch>
          <Route exact path="/" component={BillingPage} />
        </Switch>
      </Router>
    </div>
  </>
);

export default App;