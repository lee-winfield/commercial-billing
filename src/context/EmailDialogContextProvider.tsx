import React from 'react'
const { useReducer } = React

export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const OPEN_DIALOG = 'OPEN_DIALOG'

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
const EmailDialogStateDispatch = React.createContext<React.Dispatch<EmailDialogAction> | undefined>(undefined)

const EmailDialogContextProvider: React.SFC<any> = (props: any) => {
  const emailReducer = (state: EmailDialogState, action: EmailDialogAction): EmailDialogState => {
    switch (action.type) {
      case CLOSE_DIALOG: {
        return initialState
      }
      case OPEN_DIALOG: {
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

  const [state, dispatch] = useReducer(emailReducer, initialState)

  return (
    <EmailDialogState.Provider value={state}>
      <EmailDialogStateDispatch.Provider value={dispatch}>
        {props.children}
      </EmailDialogStateDispatch.Provider>
    </EmailDialogState.Provider>
  )
}

export const useDialogState = () => {
  const context = React.useContext(EmailDialogState)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

export const useCountDispatch = () => {
  const context = React.useContext(EmailDialogStateDispatch)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

export default EmailDialogContextProvider;