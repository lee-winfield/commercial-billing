import * as React from 'react'
import { map } from 'lodash'
import { Bill } from '../App'
import { Panel } from 'react-bootstrap'

interface CardsProps {
  bills: Bill[]
}

interface CardProps {
  bill: Bill
}

const Card: React.SFC<CardProps> = ({ bill }) => {
  const { invoiceNum, location, recipientInfo } = bill

  return (
    <div className='card'>
      <h3 className={'card-header'}>
        <div>Invoice: {invoiceNum}</div>
      </h3>
      <div className='card-info'>
        <strong>
          {'Recipient: '}
        </strong>
        {recipientInfo.name}
      </div>
      <div className='card-info'>
        <strong>
          {'Date Created: '}
        </strong>
        {'N/A'}
      </div>
    </div>
  )
}

const Cards: React.SFC<CardsProps> = ({ bills }) => (
  <Panel className='card-panel'>
    <div className='card-container' >
      {map(bills, bill => (<Card key={bill.invoiceNum} bill={bill}/>))}
    </div>
  </Panel>
)

export default Cards
