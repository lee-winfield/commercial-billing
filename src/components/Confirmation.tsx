import * as React from 'react'
import { Table } from 'react-bootstrap'
import { map, reduce } from 'lodash'

const TablePreview = ({ document }) => {
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
        {map(lineItems, ({serviceDate, name, amount, percentage, recipientCharge}) => (
          <tr>
            <td>{serviceDate}</td>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{percentage}%</td>
            <td>{recipientCharge}</td>
          </tr>
        ))}
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

const Confirmation = ({ documents }) => {
  console.log('Documents: ', documents)

  return (<>
    {map(documents, document => (<TablePreview document={document}/>))}
  </>)
}

export default Confirmation
