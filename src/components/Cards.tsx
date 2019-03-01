import * as React from 'react'
import { map } from 'lodash'
import { Bill } from './BillingPage'
import { Panel } from 'react-bootstrap'
import { Modal, Button } from 'react-bootstrap'
import { TablePreview } from './Confirmation'
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import { Card } from '@rmwc/card';
const { useState } = React


interface CardsProps {
  bills: Bill[]
}

const BillCard: React.SFC<any> = (props) => {
  const [ modalOpen, setModalOpen ] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const { bill } = props
  const { invoiceNum, location, recipientInfo, createdOn } = bill
  const handleClick = () => openModal()
  
  return (
    <>
      <Card onClick={handleClick}>
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
      </Card>
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
      {map(bills, bill => (<BillCard key={bill.invoiceNum} bill={bill}/>))}
    </div>
  </Panel>
)

export default Cards
