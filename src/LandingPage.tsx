import * as React from 'react'
import Select from 'react-select'
import BillingForm from './BillingForm'
import getNextInvoiceNum from './helpers/getNextInvoiceNum'
import axios from 'axios'
import { get, map } from 'lodash'


export interface RecipientOption {
  value: string
  label: string
}

export interface LandingPageState {
  selectedRecipient: RecipientOption | null
  recipientList: RecipientOption[]
  bills: object[] | null
}

const BillList = ({ bills }) => (
  <ul>
    {map(bills, bill => 
      (<li>
        <a href={bill.location} >
          {`${bill.recipientInfo.name} - ${bill.invoiceNum}`}
        </a>
      </li>)
    )}
  </ul>
)

export default class LandingPage extends React.Component<any, LandingPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      recipientList: [
        { label: 'Relson Gracie', value:'relson_gracie' },
        { label: 'KD Moore', value: 'kd_moore'}
      ],
      selectedRecipient: null,
      bills: null,
    }
  }

  async componentDidMount() {
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'

    console.log('here1')

    const response = await axios.get(url)
    const bills = get(response, 'data.Items', [])
    console.log(bills)

    this.setState({ bills: bills })
  }

  public render() {
    const { recipientList, selectedRecipient, bills } = this.state
    const handleChange = (e: RecipientOption) => this.setState({ selectedRecipient: e })
    return (
      <div>
        <Select
          value={selectedRecipient}
          onChange={handleChange}
          options={recipientList}
          placeholder={'Select a Bill Recipient...'}
        />
        {selectedRecipient ? <BillingForm
          selectedRecipient={selectedRecipient}
          invoiceNum={getNextInvoiceNum(bills)}
        /> : <BillList bills={bills}/>}
      </div>
    );
  }
}
