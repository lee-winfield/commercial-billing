import * as React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Logo from './components/Logo'
import { get } from 'lodash'
import axios from 'axios'
import Cards from './components/Cards'
import BillingModal from './components/BillingModal'

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
  isBillingModalOpen: boolean
}
class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props)

    this.state = {
      bills: null,
      isBillingModalOpen: false,
    }
  }

  async componentDidMount() {
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'

    const response = await axios.get(url)
    const bills = get(response, 'data.Items', [])

    this.setState({ bills: bills })
  }

  public render() {
    const { bills, isBillingModalOpen } = this.state
    const openModal = () => this.setState({ isBillingModalOpen: true })
    const closeModal = () => this.setState({ isBillingModalOpen: false })
    
    return (
      <div className="App">
        <Navbar />
        <div className='app-body'>
          <Logo />
          <Cards bills={bills} />
          <div className='fab' onClick={openModal} >
            +
          </div>
          <BillingModal
            isBillingModalOpen={isBillingModalOpen}
            bills={bills}
            closeModal={closeModal}
          />
        </div>
      </div>
    );
  }
}

export default App;
