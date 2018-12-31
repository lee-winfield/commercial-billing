import * as React from 'react'
import { Table } from 'react-bootstrap'
import { map, reduce } from 'lodash'

const LineItem = ({ lineItem } ) => {
  const {serviceDate, name, amount, percentage, recipientCharge} = lineItem
  return (
    <tr>
      <td>{serviceDate}</td>
      <td>{name}</td>
      <td>{amount}</td>
      <td>{percentage}%</td>
      <td>{recipientCharge}</td>
    </tr>
  )
}

export const TablePreview = ({ document }) => {
  const { lineItems, invoiceNum, recipientInfo } = document
  const { name: recipientName } = recipientInfo
  const totalBill = reduce(lineItems, (acc, { recipientCharge }) => acc + recipientCharge, 0)

  return <div className="table-preview">
    <h3>
      {recipientName} - {invoiceNum}
    </h3>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Date Range</th>
          <th>Recipient</th>
          <th>Total Bill</th>
          <th>Percentage</th>
          <th>Amount Owed</th>
        </tr>
      </thead>
      <tbody>
        {map(
          lineItems,
          lineItem => (<LineItem
            lineItem={lineItem}
            key={`${recipientName}-${invoiceNum}-${lineItem.name}`}
          />)
        )}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{totalBill}</td>
        </tr>
      </tbody>
    </Table>
  </div>
}

const Confirmation = ({ documents, errors }) => {

  return (<>
    {map(documents, document => (<TablePreview
      document={document}
      key={`${document.recipientName}-${document.invoiceNum}`}
    />))}
    {errors.sources && <div className='error'>{errors.sources}</div>}
    {errors.recipients && <div className='error'>{errors.recipients}</div>}
  </>)
}

export default Confirmation
