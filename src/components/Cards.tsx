import * as React from 'react'
import '@material/layout-grid/dist/mdc.layout-grid.css';
import { map } from 'lodash'
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import {
  Card,
  CardActionButton,
  CardActionButtons,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { BillingContext } from '../context/BillingContextProvider';
import { Button } from '@rmwc/button'
import '@rmwc/icon/icon.css';
import { LinkButton } from './LinkButton';
import {
  GridTile, GridList,
} from '@rmwc/grid-list';
import '@material/grid-list/dist/mdc.grid-list.css';
import { sortBy, isEmpty } from 'lodash'
import { getEmailAddrByRecipientId } from '../helpers/getEmailAddrByRecipientId';
import { getCurrentMonth } from '../helpers/getCurrentMonth';
import { useEmailDialogDispatch, OPEN_DIALOG } from '../context/EmailDialogContextProvider';
const { useContext } = React

const BillCard: React.SFC<any> = (props) => {
  const { bill } = props
  const { invoiceNum, location, recipientInfo, createdOn, fileName, emailSent } = bill
  const countDispatch = useEmailDialogDispatch()

  const openDialog = () => countDispatch({
    type: OPEN_DIALOG,
    fileName: `${fileName}.pdf`,
    recipient: getEmailAddrByRecipientId(recipientInfo.id),
    subject: `${getCurrentMonth()} Billing`,
  })

  return (
    <GridTile style={{ width: '300px' }}>
      <Card style={{ margin: '10px'}}>
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
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <CardActionButtons>
            <LinkButton to={`/billing/view/${invoiceNum}`} icon='visibility' label='' />
            <CardActionButton href={location} onClick={e => {e.stopPropagation()}}>
              <Button
                icon="cloud_download"
                tag='a'
                href={location}
              />
            </CardActionButton>
            <Button
              onClick={openDialog}
              icon="email"
              disabled={isEmpty(fileName) || emailSent }
            />
          </CardActionButtons>
        </div>
      </Card>
    </GridTile>
  )
}

const Cards: React.SFC = (props) => {
  const { bills } = useContext(BillingContext)
  const sortedBills = sortBy(bills, (bill) => - bill.invoiceNum)

  return (
    <GridList>
      {map(sortedBills, bill => (<BillCard key={bill.invoiceNum} bill={bill}/>))}
    </GridList>
  )
}

export default Cards
