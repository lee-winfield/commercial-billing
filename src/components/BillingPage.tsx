import * as React from 'react'
import '../App.css'
import { get, sortBy } from 'lodash'
import axios from 'axios'
import Cards from './Cards'
import BillingModal from './BillingModal'
import getNextInvoiceNum from '../helpers/getNextInvoiceNum'
import getRecipients from '../helpers/getRecipients'
import getSources from '../helpers/getSources'
import { Prompt } from 'react-router-dom'


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

interface BillingPageState {
  bills: Bill[] | null
  isBillingModalOpen: boolean
  recipients: object[]
  sources: object[]
}
class BillingPage extends React.Component<any, BillingPageState> {
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
    const sources = await getSources()
    this.setState({ bills, recipients, sources })
    window.onbeforeunload = () => "Are you certain that you want to leave? Work may be lost"  
  }

  componentDidUpdate() {
    window.onbeforeunload = () => "Are you certain that you want to leave? Work may be lost"
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
      <>
        <Prompt
          when={true}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
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
      </>
    )
  }
}

export default BillingPage;
