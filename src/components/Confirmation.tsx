import * as React from 'react'
import { Table } from 'react-bootstrap'
import { map } from 'lodash'

const TablePreview = ({ document }) => {
  const { lineItems, invoiceNum, recipientInfo } = document
  const { name: recipientName } = recipientInfo

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
