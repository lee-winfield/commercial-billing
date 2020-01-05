import * as React from 'react'
import getBills from '../helpers/getBills';
import { DocumentInterface } from '../helpers/formatValuesForDocuments';
const { useState, useEffect } = React

export interface BillingContextInterface {
  bills: DocumentInterface[] | null;
  setBills: React.Dispatch<any>;
  refreshBills: () => Promise<void>;
}

export const BillingContext = React.createContext<BillingContextInterface>({
  bills: [],
  setBills: () => undefined,
  refreshBills: async () => undefined,
})

const BillingContextProvider: React.SFC<any> = (props: any) => {
  const [ bills, setBills ] = useState<DocumentInterface[] | null>(null)

  async function initialize() {
    const bills = getBills()

    setBills(await bills)
  }
  const refreshBills = async () => {
    const bills = getBills()

    setBills(await bills)
  }

  useEffect( () => {
    initialize()
  }, [])

  return (
    <BillingContext.Provider value={{ bills, setBills, refreshBills }}>
      {props.children}
    </BillingContext.Provider>
  )
}

export default BillingContextProvider;
