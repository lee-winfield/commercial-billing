import * as React from 'react'
import getBills from 'src/helpers/getBills';
const { useState, useEffect } = React


export const BillingContext = React.createContext({
  bills: [],
  setBills: null,
})

const BillingContextProvider: React.SFC<any> = (props: any) => {
  const [ bills, setBills ] = useState(null)

  async function initialize() {
    const bills = getBills()

    setBills(await bills)

  }

  useEffect( () => {
    initialize()
  }, [])

  return (
    <BillingContext.Provider value={{ bills, setBills }}>
      {props.children}
    </BillingContext.Provider>
  )
}

export default BillingContextProvider;
