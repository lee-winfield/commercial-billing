import React, { useContext } from 'react'
import { EmailDialogState, EmailDialogStateModifiers } from '../context/EmailDialogContextProvider'
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from  '@rmwc/dialog'

export const EmailDialog = () => {
  const { sender, dialogOpen } = useContext(EmailDialogState)
  const { closeDialog } = useContext(EmailDialogStateModifiers)

  return (
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>Are you sure you'd like to send this email?</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept" onClick={sender}>
            Send
          </DialogButton>
        </DialogActions>
      </Dialog>
  );
}