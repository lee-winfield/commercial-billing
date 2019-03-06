import * as React from 'react'
import Cards from './Cards'
import { LinkFab } from './LinkButton'

const BillingPage: React.SFC = (props) => (
  <>
    <LinkFab
      icon={'add'}
      to={'/billing/form/new'}
    />
    <Cards />
  </>
)

export default BillingPage;
