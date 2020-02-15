import * as React from 'react'
const { useState } = React

export interface EmailDialogStateInterface {
  dialogOpen: boolean
  sender: () => void
}
export interface EmailDialogStateModifiersInterface {
  closeDialog: () => void
  openDialog: (sendFunc: () => void) => void
}

export const EmailDialogState = React.createContext<EmailDialogStateInterface>({
  dialogOpen: false,
  sender: () => null,
})
export const EmailDialogStateModifiers = React.createContext<EmailDialogStateModifiersInterface>({
  closeDialog: () => null,
  openDialog: (sendFunc: () => void) => null,
})

const EmailDialogContextProvider: React.SFC<any> = (props: any) => {
  const [ dialogOpen, setDialogOpen ] = useState<boolean>(false)
  const [ sender, setSender ] = useState<() => void>(() => null)
  const closeDialog = () => {
    setDialogOpen(false)
    setSender(() => null)
  }
  const openDialog = (sendFunc: () => void) => {
    setDialogOpen(true)
    setSender(() => sendFunc)
  }

  return (
    <EmailDialogState.Provider value={{ dialogOpen, sender }}>
      <EmailDialogStateModifiers.Provider value={{ closeDialog, openDialog }}>
        {props.children}
      </EmailDialogStateModifiers.Provider>
    </EmailDialogState.Provider>
  )
}

export default EmailDialogContextProvider;