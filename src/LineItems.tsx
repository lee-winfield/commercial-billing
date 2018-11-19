import * as React from 'react'    
import { Field } from 'formik'
import { values as getValues } from 'lodash'


export interface LineItem {
  id: string
  serviceDate: string
  description: string
  amount: number
  percentage: number
}


export interface LineItemMap {
  [lineItemId: string]: LineItem
}

export interface LineItemProps {
  lineItem: LineItem
  values: any
  setFieldValue(field: string, value: any): any
}

export interface LineItemsProps {
  values: any
  setFieldValue(field: string, value: any): any
}


const getAmountOwed = (values: LineItemMap, id: string): number => values[id].amount * values[id].percentage / 100 || 0
const getTotalAmountOwed = (values: LineItemMap) => {
  const lineItems = getValues(values) as LineItem[]
  return lineItems
    .map((li: LineItem) => getAmountOwed(values, li.id))
    .reduce((acc: number, num: number): number => acc + num, 0)
}


const LineItem = (props: LineItemProps) => {
  const { values, setFieldValue, lineItem } = props
  const id = lineItem.id
  const setServiceDate = (e: any) => setFieldValue(`[${id}].serviceDate`, e.target.value)
  const setDescription = (e: any) => setFieldValue(`[${id}].description`, e.target.value)
  const setAmount = (e: any) => setFieldValue(`[${id}].amount`, parseFloat(e.target.value))
  const setPercentage = (e: any) => setFieldValue(`[${id}].percentage`, parseFloat(e.target.value))
  const amountOwed = getAmountOwed(values, id)


  return (
    <>
      <tr>
        <td>
          <Field name='serviceDate' onChange={setServiceDate} value={values[id].serviceDate}/>
        </td>
        <td>
          <Field className='description-input' name='description' onChange={setDescription} value={values[id].description}/>
        </td>
        <td>
          <input
            onChange={setAmount}
            type="number"
            value={values[id].amount}
            min="0"
            step="0.01"
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            className="currency"
          />
        </td>
        <td>
          <Field className='percentage-input' name='percentage' onChange={setPercentage} value={values[id].percentage || 0}/>
        </td>
        <td className='border'>
          {amountOwed}
        </td>
      </tr>
    </>
  )
}

export const LineItems: React.SFC<LineItemsProps> = ({ values, setFieldValue }) => {
    const lineItems = getValues(values)
    
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
                    {lineItems.map((li: LineItem) => <LineItem
                        key={li.id}
                        values={values}
                        setFieldValue={setFieldValue}
                        lineItem={li}
                    />)}
                    <tr>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td>{getTotalAmountOwed(values)}</td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>)
}