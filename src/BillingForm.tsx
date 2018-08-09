import { values } from 'lodash'
import * as React from 'react'
import { RecipientOption } from './LandingPage'

export interface BIllingFormProps {
    selectedRecipient: RecipientOption | null
}

export interface LineItem {
    id: number
    serviceDateRange?: string
    description?: string
    currentCharges?: number
    percentage?: number
    amountOwed?: number
}

export interface LineItemMap {
    [lineItemId: number]: LineItem
}

export interface BIllingFormState {
    lineItems: LineItemMap
}


export interface LineItemProps {
    lineItem: LineItem
    setField(id: number, field: string): any
    setNumberField(id: number, field: string): any
}

    
const LineItem = (props: LineItemProps) => {
    const { lineItem, setField, setNumberField } = props
    const { id } = lineItem
    const amountOwed = lineItem.currentCharges && lineItem.percentage ? lineItem.currentCharges * lineItem.percentage / 100 : 0


    return (<>
        <tr>
            <td>
                <input type='text' name='serviceDateRange' onChange={setField(id, 'serviceDateRange')}/>
            </td>
            <td>
                <input type='text' name='description' onChange={setField(id, 'description')}/>
            </td>
            <td>
                <input type='text' name='currentCharges' onChange={setNumberField(id, 'currentCharges')}/>
            </td>
            <td>
                <input type='text' name='percentage' onChange={setNumberField(id, 'percentage')}/>
            </td>
            <td className='border'>
                {amountOwed}
            </td>
        </tr>
    </>)}

export default class BIllingForm extends React.Component<BIllingFormProps, BIllingFormState> {
  constructor(props: BIllingFormProps) {
    super(props);

    this.state = {
        lineItems: {
            1: {id: 1},
            2: {id: 2},
            3: {id: 3},
            4: {id: 4},
        },
    }
  }

  public render() {
    const { lineItems } = this.state
    const setField = (id: number, field: string) => (e: any) =>
        this.setState({
            lineItems: {
                ...this.state.lineItems,
                [id]: {
                    ...this.state.lineItems[id],
                    [field]: e.target.value,
                },
            },
        })

        // const setAmountOwed = (id: number, amountOwed: number) =>
        // this.setState({
        //     lineItems: {
        //         ...this.state.lineItems,
        //         [id]: {
        //             ...this.state.lineItems[id],
        //             amountOwed,
        //         },
        //     },
        // })

        const setNumberField = (id: number, field: string) => (e: any) =>
        this.setState({
            lineItems: {
                ...this.state.lineItems,
                [id]: {
                    ...this.state.lineItems[id],
                    [field]: parseFloat(e.target.value),
                },
            },
        })


    console.log(this.state)

    const lineItemArray = values(this.state.lineItems)
    const totalAmountOwed = lineItemArray.reduce(
        (acc: number, li: LineItem) => {
            console.log(li)
            return acc + (li.amountOwed || 0)
        }, 0
    )
    return (
      <div>
        <form>
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
                    {values(lineItems).map((li: LineItem) => <LineItem
                        key={li.id}
                        setField={setField}
                        setNumberField={setNumberField}
                        lineItem={li}
                    />)}
                    <tr>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td>{totalAmountOwed}</td>
                    </tr>
                </tbody>
                <input type="submit" value="Submit" />
            </table>
        </form>
      </div>
    );
  }
}
