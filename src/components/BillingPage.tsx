import * as React from 'react'
import Cards from './Cards'
import { Prompt } from 'react-router-dom'
import { Fab } from '@rmwc/fab'
import '@material/fab/dist/mdc.fab.css';
import { BillingContext } from 'src/context/BillingContextProvider';

const { useEffect, useContext } = React

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
  const { bills } = useContext(BillingContext)

  useEffect( () => {
    window.onbeforeunload = () => "Are you certain that you want to leave? Work may be lost"  
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
