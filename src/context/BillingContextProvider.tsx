import React, { useReducer, Dispatch } from 'react'
import { DocumentInterface } from '../helpers/formatValuesForDocuments'
import getBills from '../helpers/getBills'

export const FETCHING_BILLS_ACTION = 'FETCHING_BILLS_ACTION'
export const SET_BILLS_ACTION = 'SET_BILLS_ACTION'
export const ERROR_FETCHING_BILLS_ACTION = 'ERROR_FETCHING_BILLS_ACTION'

export const FETCHING_STATUS = 'FETCHING_STATUS'
export const SUCCESS_STATUS = 'SUCCESS_STATUS'
export const ERROR_STATUS = 'ERROR_STATUS'

export interface BillingStateInterface {
  status: string | undefined;
  bills: DocumentInterface[] | undefined;
}

export interface BillingAction {
  type: string,
  bills?: DocumentInterface[],
}

const initialState = { bills: undefined, status: undefined }

const BillingState = React.createContext<BillingStateInterface>(initialState)
const BillingDispatch = React.createContext<React.Dispatch<BillingAction> | undefined>(undefined)

const BillingContextProvider: React.SFC<any> = (props: any) => {
  const reducer = (state: BillingStateInterface, action: BillingAction): BillingStateInterface => {
    switch (action.type) {
      case FETCHING_BILLS_ACTION: {
        return { bills: undefined, status: FETCHING_STATUS }
      }
      case SET_BILLS_ACTION: {
        return { status: SUCCESS_STATUS, bills: action.bills }
      }
      case ERROR_FETCHING_BILLS_ACTION: {
        return { status: ERROR_STATUS, bills: undefined }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <BillingState.Provider value={state}>
      <BillingDispatch.Provider value={dispatch}>
        {props.children}
      </BillingDispatch.Provider>
    </BillingState.Provider>
  )
}

export const useBillingState = (): BillingStateInterface => {
  const context = React.useContext(BillingState)
  if (context === undefined) {
    throw new Error('useBillingState must be used within a BillingContextProvider')
  }
  return context
}

export const useBillingDispatch = (): Dispatch<BillingAction> => {
  const context = React.useContext(BillingDispatch)
  if (context === undefined) {
    throw new Error('useBillingDispatch must be used within a BillingContextProvider')
  }
  return context
}

export const useBillFetcher = () => {
  const dispatch = useBillingDispatch()

  const fetchBills = async () => {
    dispatch({ type: FETCHING_BILLS_ACTION })

    try {
      const bills = await getBills()
      dispatch({ type: SET_BILLS_ACTION, bills });
    } catch (e) {
      dispatch({ type: ERROR_FETCHING_BILLS_ACTION });
    }
  }

  return fetchBills
}

export default BillingContextProvider;