import * as React from 'react'
import {
    Field,
    Form,
    Formik,
} from 'formik'
import { RecipientOption } from './LandingPage'
import { values as getValues } from 'lodash'

export interface BIllingFormProps {
    selectedRecipient: RecipientOption | null
}

export interface LineItem {
    id: string
    serviceDateRange: string
    description: string
    currentCharges: number
    percentage: number
}

export interface LineItemMap {
    [lineItemId: string]: LineItem
}

export interface LineItemProps {
    lineItem: LineItem
    values: any
    handleSubmit(values: any): any
    setFieldValue(field: string, value: any): any
}

export interface LineItemsProps {
    values: any
    handleSubmit(values: any): any
    setFieldValue(field: string, value: any): any
}

const getAmountOwed = (values: LineItemMap, id: string): number => values[id].currentCharges * values[id].percentage / 100 || 0
const getTotalAmountOwed = (values: LineItemMap) => {
    const lineItems = getValues(values) as LineItem[]
    return lineItems
        .map((li: LineItem) => getAmountOwed(values, li.id))
        .reduce(
            (acc: number, num: number): number =>
                acc + num,
                0,
        )
    }
    
const LineItem = (props: LineItemProps) => {
    const { values, setFieldValue, lineItem } = props
    const id = lineItem.id
    const setServiceDate = (e: any) => setFieldValue(`[${id}].serviceDateRange`, e.target.value)
    const setDescription = (e: any) => setFieldValue(`[${id}].description`, e.target.value)
    const setCurrentCharges = (e: any) => setFieldValue(`[${id}].currentCharges`, parseFloat(e.target.value))
    const setPercentage = (e: any) => setFieldValue(`[${id}].percentage`, parseFloat(e.target.value))
    const amountOwed = getAmountOwed(values, id)


    return (<>
        <tr>
            <td>
                <Field name='serviceDateRange' onChange={setServiceDate} value={values[id].serviceDateRange}/>
            </td>
            <td>
                <Field name='description' onChange={setDescription} value={values[id].description}/>
            </td>
            <td>
                <Field name='currentCharges' onChange={setCurrentCharges} value={values[id].currentCharges || 0.00}/>
            </td>
            <td>
                <Field name='percentage' onChange={setPercentage} value={values[id].percentage || 0}/>
            </td>
            <td className='border'>
                {amountOwed}
            </td>
        </tr>
    </>
    )
}

export const LineItems: React.SFC<LineItemsProps> = ({ handleSubmit, values, setFieldValue }) => {
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
                        handleSubmit={handleSubmit}
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
                <Field type="submit" value="Submit" />
            </table>
        </form>
    </div>)
}

const BIllingForm: React.SFC<BIllingFormProps> = ({ selectedRecipient }) => {
    const formValues = {
        '1':
            {
                id: '1',
                serviceDateRange: '',
                description: '',
                currentCharges: 0.00,
                percentage: 0,
            },
        '2':
            {
                id: '2',
                serviceDateRange: '',
                description: '',
                currentCharges: 0.00,
                percentage: 0,
            },
        '3':
            {
                id: '3',
                serviceDateRange: '',
                description: '',
                currentCharges: 0.00,
                percentage: 0,
            },
        '4':
            {
                id: '4',
                serviceDateRange: '',
                description: '',
                currentCharges: 0,
                percentage: 0,
            },

    }


    const submitForm = () => console.log('SUBMIT')
    return (
        <div>
          <h1>My Example</h1>
          <Formik
            initialValues={formValues}
            onSubmit={submitForm}
            render={({ values, setFieldValue, handleSubmit }) => (
                <Form>
                <LineItems
                    values={values}
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                />
                <button type='submit'>Submit</button>
              </Form>
            )}
          />
        </div>
      )
}

export default BIllingForm