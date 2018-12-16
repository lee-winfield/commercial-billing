import * as React from 'react'
import { map } from 'lodash'
import { Bill } from '../App'

interface CardsProps {
  bills: Bill[]
}

interface CardProps {
  bill: Bill
}

const Card: React.SFC<CardProps> = ({ bill }) => {
  console.log({bill})
  const { invoiceNum, location, recipientInfo } = bill

  return (
    <div className='card'>
      <div>Invoice: {invoiceNum}</div>
      <div>Recipient: {recipientInfo.name}</div>
      <div>Date Created: N/A</div>
    </div>
  )
}

const Cards: React.SFC<CardsProps> = ({ bills }) => (
  <div className='card-container' >
    {map(bills, bill => (<Card key={bill.invoiceNum} bill={bill}/>))}
  </div>
)

export default Cards
