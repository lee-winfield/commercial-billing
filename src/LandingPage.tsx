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
}

export interface LandingPageProps {
  bills: object[] | null
}


export default class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      recipientList: [
        { label: 'Relson Gracie', value:'relson_gracie' },
        { label: 'KD Moore', value: 'kd_moore'}
      ],
      selectedRecipient: null,
    }
  }

  public render() {
    const { bills } = this.props
    const { recipientList, selectedRecipient } = this.state
    const setSelectedRecipient = (e: RecipientOption) => this.setState({ selectedRecipient: e })
    const unsetSelectedRecipient = () => this.setState({ selectedRecipient: null })

    return (
      <div>
        <Select
          value={selectedRecipient}
          onChange={setSelectedRecipient}
          options={recipientList}
          placeholder={'Select a Bill Recipient...'}
        />
        {selectedRecipient ? <BillingForm
          selectedRecipient={selectedRecipient}
          invoiceNum={getNextInvoiceNum(bills)}
          unsetSelectedRecipient={unsetSelectedRecipient}
        /> : null}
      </div>
    );
  }
}
