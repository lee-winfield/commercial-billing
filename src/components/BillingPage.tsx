import * as React from 'react'
import Cards from './Cards'
import { LinkFab } from './LinkButton'

const BillingPage: React.SFC = () => (
  <>
    <LinkFab
      icon={'add'}
      to={'/billing/form/new'}
    />
    <Cards />
  </>
)

export default BillingPage;
