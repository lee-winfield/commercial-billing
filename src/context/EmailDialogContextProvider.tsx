import React, { useReducer } from 'react'

export const CLOSE_DIALOG_ACTION = 'CLOSE_DIALOG_ACTION'
export const OPEN_DIALOG_ACTION = 'OPEN_DIALOG_ACTION'

export interface EmailDialogState {
  open: boolean,
  fileName: string,
  recipient: string,
  subject: string,
}

export interface EmailDialogAction {
  type: string,
  fileName: string,
  recipient: string,
  subject: string,
}

const initialState = {
  open: false,
  fileName: '',
  recipient: '',
  subject: '',
}

const EmailDialogState = React.createContext<EmailDialogState>(initialState)
const EmailDialogDispatch = React.createContext<React.Dispatch<EmailDialogAction> | undefined>(undefined)

const EmailDialogContextProvider: React.SFC<any> = (props: any) => {
  const reducer = (state: EmailDialogState, action: EmailDialogAction): EmailDialogState => {
    switch (action.type) {
      case CLOSE_DIALOG_ACTION: {
        return initialState
      }
      case OPEN_DIALOG_ACTION: {
        const { fileName, recipient, subject } = action

        return {
          open: true,
          fileName,
          recipient,
          subject,
        }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <EmailDialogState.Provider value={state}>
      <EmailDialogDispatch.Provider value={dispatch}>
        {props.children}
      </EmailDialogDispatch.Provider>
    </EmailDialogState.Provider>
  )
}

export const useEmailDialogState = () => {
  const context = React.useContext(EmailDialogState)
  if (context === undefined) {
    throw new Error('useEmailDialogState must be used within a EmailDialogContextProvider')
  }
  return context
}

export const useEmailDialogDispatch = () => {
  const context = React.useContext(EmailDialogDispatch)
  if (context === undefined) {
    throw new Error('useEmailDialogDispatch must be used within a EmailDialogContextProvider')
  }
  return context
}

export default EmailDialogContextProvider;