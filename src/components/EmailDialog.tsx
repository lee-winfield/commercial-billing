import React from 'react'
import { useDialogState, useCountDispatch, CLOSE_DIALOG } from '../context/EmailDialogContextProvider'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from  '@rmwc/dialog'
import { sendEmail } from '../helpers/sendEmail'

export const EmailDialog = () => {
  const { open, fileName, recipient, subject } = useDialogState()
  const countDispatch = useCountDispatch()
  const closeDialog = () => countDispatch({
    type: CLOSE_DIALOG,
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