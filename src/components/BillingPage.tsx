import * as React from 'react'
// import '../App.css'
import Cards from './Cards'
import BillingForm from './BillingForm'
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

  async function initialize() {
    const bills = getBills()

    setBills(await bills)

    window.onbeforeunload = () => "Are you certain that you want to leave? Work may be lost"  
  }

  useEffect( () => {
    initialize()
  }, [])

  return (
    <>
      <Prompt
        when={true}
        message={location => `Are you sure you want to go to ${location.pathname}`}
      />
      <Cards bills={bills} />
      <Fab icon='add' label='Create' onClick={() => null} />
    </>
  )
}

export default BillingPage;
