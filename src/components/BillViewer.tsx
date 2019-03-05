import * as React from 'react'
import { TablePreview } from './Confirmation'
import { LinkButton } from './LinkButton';
import { get, find } from 'lodash'
import { BillingContext } from 'src/context/BillingContextProvider';
import { Typography } from '@rmwc/typography';
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import '@material/typography/dist/mdc.typography.css';
const { useContext } = React

export const BillViewer = (props) => {
  const invoiceNum = get(props, 'match.params.invoiceNum', null)
  const { bills } = useContext(BillingContext)
  const bill = find(bills, (bill) => bill.invoiceNum === Number(invoiceNum), null)
  
  return (
    <>
      <Grid>
        <GridCell span={12}>
          <Typography use='headline6'>
            Bill Information
          </Typography>
        </GridCell>
      </Grid>
        {bill ? <TablePreview document={bill}/> : null}
      <Grid>
        <LinkButton to='/billing' icon={null} label='Close' />
      </Grid>
    </>
  )
}