import * as React from 'react'
import { RecipientOption } from './LandingPage'

export interface BIllingFormProps {
    selectedRecipient: RecipientOption | null
}

export interface BIllingFormState {
    lineItems: any[]
}


export interface LineItemProps {
    id: number
    serviceDateRange?: string
    description?: string
    currentCharges?: number
    percentage?: number
}

export const LineItem = (props: LineItemProps) =>
    (<>
        <tr>
            <td>
                <input/>
            </td>
            <td>
                <input/>
            </td>
            <td>
                <input/>
            </td>
            <td>
                <input/>
            </td>
            <td>
                placeholder
            </td>
        </tr>
    </>)

export default class BIllingForm extends React.Component<BIllingFormProps, BIllingFormState> {
  constructor(props: BIllingFormProps) {
    super(props);

    this.state = {
        lineItems: [{id: 1},{id: 2},{id: 3},{id: 4}]
    }
  }

  public render() {
    const { lineItems } = this.state

    return (
      <div>
        <table>
            <thead>
                <tr>
                    <td>Service Date Range</td>
                    <td>Description</td>
                    <td>Current Charges</td>
                    <td>Percentage</td>
                    <td>Amount Owed</td>
                </tr>
            </thead>
            <tbody>
                {lineItems.map((li: any) => <LineItem key={li.id} id={li.id} />)}
            </tbody>
        </table>
      </div>
    );
  }
}
