import * as React from 'react'
import { TablePreview } from './Submission'
import { LinkButton } from './LinkButton';
import { get, find } from 'lodash'
import { BillingContext } from '../context/BillingContextProvider';
import { Typography } from '@rmwc/typography';
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import '@material/typography/dist/mdc.typography.css';
const { useContext } = React

interface BillViewerProps {

}

export const BillViewer = (props: BillViewerProps) => {
  const invoiceNum = get(props, 'match.params.invoiceNum', null)
  const { bills } = useContext(BillingContext)
  const bill = find(bills, (bill) => bill.invoiceNum === Number(invoiceNum)) || null

  return (
    <>
      <Grid>
        <GridCell span={12}>
          <Typography use='headline6'>
            Bill Information
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <LinkButton to='/billing' icon={null} label='Close' />
        </GridCell>
        <GridCell span={12}>
          {bill ? <TablePreview document={bill}/> : null}
        </GridCell>
      </Grid>
    </>
  )
}