import * as React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Logo from './components/Logo'
import { get, sortBy } from 'lodash'
import axios from 'axios'
import Cards from './components/Cards'
import BillingModal from './components/BillingModal'
import getNextInvoiceNum from './helpers/getNextInvoiceNum'
import getRecipients from './helpers/getRecipients'
import getSources from './helpers/getSources'

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
  recipients: object[]
  sources: object[]
}
class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props)

    this.state = {
      bills: null,
      isBillingModalOpen: false,
      recipients: [],
      sources: [],
    }
  }

  async componentDidMount() {
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'

    const response = await axios.get(url)
    const bills = sortBy(get(response, 'data.Items', []), ['invoiceNum']).reverse()
    const recipients = getRecipients()
    const sources = getSources()
    this.setState({ bills, recipients, sources })
  }

  addBill = bill => {
    this.setState({bills: [bill, ...this.state.bills]})
  }

  public render() {
    const { bills, isBillingModalOpen, recipients, sources } = this.state
    const openModal = () => this.setState({ isBillingModalOpen: true })
    const closeModal = () => this.setState({ isBillingModalOpen: false })
    const nextInvoiceNum = getNextInvoiceNum(bills)
    const addBill = this.addBill
    
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
            closeModal={closeModal}
            nextInvoiceNum={nextInvoiceNum}
            recipients={recipients}
            sources={sources}
            addBill={addBill}
          />
        </div>
      </div>
    );
  }
}

export default App;
