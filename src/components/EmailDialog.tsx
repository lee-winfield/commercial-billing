import React from 'react'
import { useEmailDialogState, useEmailDialogDispatch, CLOSE_DIALOG_ACTION } from '../context/EmailDialogContextProvider'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from  '@rmwc/dialog'
import { sendEmail } from '../helpers/sendEmail'

export const EmailDialog = () => {
  const { open, fileName, recipient, subject } = useEmailDialogState()
  const countDispatch = useEmailDialogDispatch()
  const closeDialog = () => countDispatch({
    type: CLOSE_DIALOG_ACTION,
    fileName: '',
    recipient: '',
    subject: '',
  })

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
    >
      <DialogTitle>Email Confirmation</DialogTitle>
      <DialogContent>{`Are you sure you'd like to email the file "${fileName}" to ${recipient}?`}</DialogContent>
      <DialogActions>
        <DialogButton action="close">No</DialogButton>
        <DialogButton action="accept" onClick={() => sendEmail(fileName, recipient, subject)}>
          Yes
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
}