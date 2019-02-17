import * as React from 'react'
import { map } from 'lodash'
import { Bill } from './BillingPage'
import { Panel } from 'react-bootstrap'
import { Modal, Button } from 'react-bootstrap'
import { TablePreview } from './Confirmation'
const { useState } = React


interface CardsProps {
  bills: Bill[]
}

const Card: React.SFC<any> = (props) => {
  const [ modalOpen, setModalOpen ] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const { bill } = props
  const { invoiceNum, location, recipientInfo, createdOn } = bill
  const handleClick = () => openModal()
  
  return (
    <>
      <div className='card' onClick={handleClick}>
        <h3 className={'card-header'}>
          <div>Invoice: {invoiceNum}</div>
        </h3>
        <div className='card-info'>
          <strong>
            {'Recipient: '}
          </strong>
          {recipientInfo.name}
        </div>
        <div className='card-info'>
          <strong>
            {'Date Created: '}
          </strong>
          {createdOn ? new Date(createdOn).toDateString() : 'N/A'}
        </div>
        <div className='download'>
          <a href={location} onClick={e => {e.stopPropagation()}}>Download</a>
        </div>
      </div>
      <Modal show={modalOpen} dialogComponentClass='billing-modal'>
        <Modal.Dialog
            dialogClassName='billing-modal'
        >
          <Modal.Header>
            <Modal.Title>Bill Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TablePreview
              document={bill}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  )
}

const Cards: React.SFC<CardsProps> = ({ bills }) => (
  <Panel className='card-panel'>
    <div className='card-container' >
      {map(bills, bill => (<Card key={bill.invoiceNum} bill={bill}/>))}
    </div>
  </Panel>
)

export default Cards
