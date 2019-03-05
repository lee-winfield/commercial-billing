import * as React from 'react'
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import { map } from 'lodash'
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import {
  Card,
  CardPrimaryAction,
  CardActionButton,
  CardActionButtons,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { BillingContext } from 'src/context/BillingContextProvider';
import { IconButton } from '@rmwc/icon-button'
import '@rmwc/icon/icon.css';
import { LinkButton } from './LinkButton';
const { useContext } = React

const BillCard: React.SFC<any> = (props) => {
  const { bill } = props
  const { invoiceNum, location, recipientInfo, createdOn } = bill
  
  return (
    <GridCell>
      <Card >
        <CardPrimaryAction style={{ height: '8rem' }}>
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
            <LinkButton to={`/billing/view/${invoiceNum}`} icon={null} label='View Bill' />
            <CardActionButton href={location} onClick={e => {e.stopPropagation()}}>
              <IconButton
                icon="cloud_download"
                label="Download"
                tag='a'
                href={location}
              />        
            </CardActionButton>
          </CardActionButtons>
        </div>
      </Card>
    </GridCell>
  )
}

const Cards: React.SFC = (props) => {
  const { bills } = useContext(BillingContext)  
  
  return (
    <Grid>
      {map(bills, bill => (<BillCard key={bill.invoiceNum} bill={bill}/>))}
    </Grid>
  )
}

export default Cards
