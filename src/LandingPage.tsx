import * as React from 'react'
import Select from 'react-select'
import BillingForm from './BillingForm'

export interface RecipientOption {
  value: string
  label: string
}

export interface LandingPageState {
  selectedRecipient: RecipientOption | null
  recipientList: RecipientOption[]
}

export default class LandingPage extends React.Component<any, LandingPageState> {
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
    const { recipientList, selectedRecipient } = this.state
    const handleChange = (e: RecipientOption) => this.setState({ selectedRecipient: e })
    return (
      <div>
        <Select
          value={selectedRecipient}
          onChange={handleChange}
          options={recipientList}
          placeholder={'Select a Bill Recipient...'}
        />
        {selectedRecipient && <BillingForm
          selectedRecipient={selectedRecipient}
        />}
      </div>
    );
  }
}
