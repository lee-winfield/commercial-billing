import * as React from 'react'
import { map, reduce } from 'lodash'
import {
  DataTable,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';
import { Typography } from '@rmwc/typography';
import { Grid, GridCell } from '@rmwc/grid';
import '@material/grid-list/dist/mdc.grid-list.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import '@material/typography/dist/mdc.typography.css';
import '@rmwc/data-table/data-table.css';
import '@material/card/dist/mdc.card.css';
import {
  GridList,
  GridTile,
} from '@rmwc/grid-list';
import {
  Card,
} from '@rmwc/card';

const LineItem = ({ lineItem } ) => {
  const {serviceDate, name, amount, percentage, recipientCharge} = lineItem
  return (
    <DataTableRow>
      <DataTableCell>{serviceDate}</DataTableCell>
      <DataTableCell>{name}</DataTableCell>
      <DataTableCell>{amount}</DataTableCell>
      <DataTableCell>{percentage}%</DataTableCell>
      <DataTableCell>{recipientCharge}</DataTableCell>
    </DataTableRow>
  )
}

export const TablePreview = ({ document }) => {
  const { lineItems, invoiceNum, recipientInfo } = document
  const { name: recipientName } = recipientInfo
  const totalBill = reduce(lineItems, (acc, { recipientCharge }) => acc + recipientCharge, 0)

  return (<GridTile style={{ width: 'fit-content' }}>
    <Card>
      <Grid>
        <GridCell span={12}>
          <Typography use='headline6'>
            {recipientName} - {invoiceNum}
          </Typography>
        </GridCell>
      </Grid>
      <Grid>
        <GridCell span={12}>
          <DataTable>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Date Range</DataTableHeadCell>
                <DataTableHeadCell>Recipient</DataTableHeadCell>
                <DataTableHeadCell>Total Bill</DataTableHeadCell>
                <DataTableHeadCell>Percentage</DataTableHeadCell>
                <DataTableHeadCell>Amount Owed</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {map(
                lineItems,
                lineItem => (<LineItem
                  lineItem={lineItem}
                  key={`${recipientName}-${invoiceNum}-${lineItem.name}`}
                />)
              )}
              <DataTableRow>
                <DataTableCell></DataTableCell>
                <DataTableCell></DataTableCell>
                <DataTableCell></DataTableCell>
                <DataTableCell></DataTableCell>
                <DataTableCell>{totalBill}</DataTableCell>
              </DataTableRow>
            </DataTableBody>
          </DataTable>
        </GridCell>
      </Grid>
    </Card>
  </GridTile>)
}

const Submission = ({ documents, errors }) => {

  return (<>
    <GridList>
      {map(documents, document => (<TablePreview
        document={document}
        key={`${document.recipientName}-${document.invoiceNum}`}
      />))}
    </GridList>
    {errors.sources && <div className='error'>{errors.sources}</div>}
    {errors.recipients && <div className='error'>{errors.recipients}</div>}
  </>)
}

export default Submission