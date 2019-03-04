import * as React from 'react'
// import '../App.css'
import Cards from './Cards'
import BillingModal from './BillingModal'
import getNextInvoiceNum from '../helpers/getNextInvoiceNum'
import { Prompt } from 'react-router-dom'
import getBills from 'src/helpers/getBills'
import { Fab } from '@rmwc/fab'
import '@material/fab/dist/mdc.fab.css';
import getRecipients from 'src/helpers/getRecipients';
import getSources from 'src/helpers/getSources';

const { useEffect, useState } = React

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

const BillingPage: React.SFC<any> = (props: any) => {
  const [ bills, setBills ] = useState(null)
  const [ recipients, setRecipients ] = useState([])
  const [ sources, setSources ] = useState([])
  const [ isBillingModalOpen, setIsBillingModalOpen ] = useState(false)

  async function initialize() {
    const bills = getBills()
    const recipients = getRecipients()
    const sources = getSources()

    setBills(await bills)
    setRecipients(await recipients)
    setSources(await sources)

    window.onbeforeunload = () => "Are you certain that you want to leave? Work may be lost"  
  }

  useEffect( () => {
    initialize()
  }, [])

  const closeModal = () => setIsBillingModalOpen(false)
  const openModal = () => setIsBillingModalOpen(true)
  const addBill = bill => setBills([bill, ...bills])
  const nextInvoiceNum = getNextInvoiceNum(bills)

  return (
    <>
      <Prompt
        when={true}
        message={location => `Are you sure you want to go to ${location.pathname}`}
      />
      <Cards bills={bills} />
      <Fab icon='add' label='Create' onClick={openModal} />
      <BillingModal
        isBillingModalOpen={isBillingModalOpen}
        closeModal={closeModal}
        sources={sources}
        recipients={recipients}
        nextInvoiceNum={nextInvoiceNum}
        addBill={addBill}
      />
    </>
  )
}

export default BillingPage;
