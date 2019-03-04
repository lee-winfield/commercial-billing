import * as React from 'react'
import './App.css'
import BillingPage from './components/BillingPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import BillingForm from './components/BillingForm';

const App = () => (
  <>
    <Navbar />
    <div className='app-body'>
      <Router>
        <Switch>
          <Route exact path="/billing" component={BillingPage} />
          <Route exact path="/billing/form" component={BillingForm} />
        </Switch>
      </Router>
    </div>
  </>
);

export default App;