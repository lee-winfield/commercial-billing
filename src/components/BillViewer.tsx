import * as React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { TablePreview } from './Confirmation'
import { LinkButton } from './LinkButton';
import { get, find } from 'lodash'
import { BillingContext } from 'src/context/BillingContextProvider';
const { useContext } = React

export const BillViewer = (props) => {
  const invoiceNum = get(props, 'match.params.invoiceNum', null)
  const { bills } = useContext(BillingContext)
  const bill = find(bills, (bill) => bill.invoiceNum === Number(invoiceNum), null)
  
  return (
    <Modal show={true} dialogComponentClass='billing-modal'>
      <Modal.Dialog
        dialogClassName='billing-modal'
      >
        <Modal.Header>
          <Modal.Title>Bill Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bill ? <TablePreview
            document={bill}
          /> : null}
        </Modal.Body>
        <Modal.Footer>
          <LinkButton to='/billing' icon={null} label='Close' />
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}