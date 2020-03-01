import * as React from 'react'
import Cards from './Cards'
import { LinkFab } from './LinkButton'
import { useBillFetcher } from '../context/BillingContextProvider'

const BillingPage: React.SFC = () => {
  const fetchBills = useBillFetcher()
  fetchBills()

  return (
  <>
    <LinkFab
      icon={'add'}
      to={'/billing/form/new'}
    />
    <Cards />
  </>
)}

export default BillingPage;
