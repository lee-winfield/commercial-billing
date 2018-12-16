import * as React from 'react'
import './App.css'
import LandingPage from './LandingPage'
import Navbar from './components/Navbar'
import Cover from './components/Cover'
import { get } from 'lodash'
import axios from 'axios'
import Cards from './components/Cards'

export interface RecipientInfo {
  address1: string
  address2: string
  name: string
  phone: string
}

export interface Bill {
  invoiceNum: string
  recipientInfo: RecipientInfo
  location: string
}

interface AppState {
  bills: Bill[] | null
}
class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props)

    this.state = {
      bills: null,
    }
  }

  async componentDidMount() {
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'

    const response = await axios.get(url)
    const bills = get(response, 'data.Items', [])

    this.setState({ bills: bills })
  }

  public render() {
    const { bills } = this.state

    return (
      <div className="App">
        <Navbar />
        <Cover />
        <Cards bills={bills} />
        {/* <LandingPage /> */}
        <div className='fab' >
          +
        </div>
      </div>
    );
  }
}

export default App;
