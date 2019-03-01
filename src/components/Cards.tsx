import * as React from 'react'
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import { map } from 'lodash'
import { Bill } from './BillingPage'
import { Modal, Button } from 'react-bootstrap'
import { TablePreview } from './Confirmation'
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActionButton,
  CardActionIcon,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
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
    <GridCell>
      <Card >
        <CardPrimaryAction style={{ height: '8rem' }} onClick={handleClick} >
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <Typography use='headline5' >
              Invoice: {invoiceNum}
            </Typography>
          </div>
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <Typography use="body1">
              <div>
                <strong>
                  {'Recipient: '}
                </strong>
                {recipientInfo.name}
              </div>
              <div>
                <strong>
                  {'Date Created: '}
                </strong>
                {createdOn ? new Date(createdOn).toDateString() : 'N/A'}
              </div>
            </Typography>
          </div>
        </CardPrimaryAction>
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <CardActionButtons>
            <CardActionButton href={location} onClick={e => {e.stopPropagation()}}>
              <a href={location} onClick={e => {e.stopPropagation()}} download>Download</a>
            </CardActionButton>
          </CardActionButtons>
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
    </GridCell>
  )
}

const Cards: React.SFC<CardsProps> = ({ bills }) => (
  <Grid className='card-panel'>
    {map(bills, bill => (<BillCard key={bill.invoiceNum} bill={bill}/>))}
  </Grid>
)

export default Cards
