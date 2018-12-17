import * as React from 'react'
import { Modal, Button } from 'react-bootstrap'
import LandingPage from '../LandingPage'



const BillingModal = ({isBillingModalOpen, bills, closeModal}) => (
  <Modal
    show={isBillingModalOpen}
  >
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <LandingPage bills={bills} />
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeModal} >Close</Button>
        <Button bsStyle="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  </Modal>
)

export default BillingModal
