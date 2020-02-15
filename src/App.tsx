import * as React from 'react'
import './App.css'
import BillingPage from './components/BillingPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import BillingForm from './components/BillingForm';
import BillingContextProvider from './context/BillingContextProvider';
import EmailDialogContextProvider from './context/EmailDialogContextProvider';
import LandingPage from './components/LandingPage';
import { BillViewer } from './components/BillViewer';
import { EmailDialog } from './components/EmailDialog';

const App = () => (
  <BillingContextProvider>
    <EmailDialogContextProvider>
    <Navbar />
      <div className='app-body'>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/billing" component={BillingPage} />
            <Route path="/billing/view/:invoiceNum" component={BillViewer} />
            <Route exact path="/billing/form/new" component={BillingForm} />
          </Switch>
        </Router>
        <EmailDialog/>
      </div>
    </EmailDialogContextProvider>
  </BillingContextProvider>
);

export default App;