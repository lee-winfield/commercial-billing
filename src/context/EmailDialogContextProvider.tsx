import * as React from 'react'
const { useState } = React

export interface EmailDialogStateInterface {
  open: boolean,
  fileName: string,
  recipient: string,
  subject: string,
}
export interface EmailDialogStateModifiersInterface {
  closeDialog: () => void
  openDialog: (fileName: string, recipient: string, subject: string) => void
}

export const EmailDialogState = React.createContext<EmailDialogStateInterface>({
  open: false,
  fileName: '',
  recipient: '',
  subject: '',
})

export const EmailDialogStateModifiers = React.createContext<EmailDialogStateModifiersInterface>({
  closeDialog: () => null,
  openDialog: (fileName: string, recipient: string, subject: string) => null,
})

const EmailDialogContextProvider: React.SFC<any> = (props: any) => {
  const [dialog, setDialog] = useState<EmailDialogStateInterface>({
    open: false,
    fileName: '',
    recipient: '',
    subject: '',
  })

  const closeDialog = () => {
    setDialog({
      open: false,
      fileName: '',
      recipient: '',
      subject: '',
    })
  }
  const openDialog = (fileName: string, recipient: string, subject: string) => {
    setDialog({
      open: true,
      fileName,
      recipient,
      subject,
    })
  }

  return (
    <EmailDialogState.Provider value={dialog}>
      <EmailDialogStateModifiers.Provider value={{ closeDialog, openDialog }}>
        {props.children}
      </EmailDialogStateModifiers.Provider>
    </EmailDialogState.Provider>
  )
}

export default EmailDialogContextProvider;