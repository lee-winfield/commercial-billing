import * as React from 'react'
import {
    Field,
    Form,
    Formik,
    FormikActions,
} from 'formik'
import { RecipientOption } from './LandingPage'
import { values as getValues } from 'lodash'
import axios from 'axios'

export interface BIllingFormProps {
    selectedRecipient: RecipientOption | null
}

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


const handleSubmit = (values: any, actions: FormikActions<any>) => {
    console.log(process.env)
    console.log(actions)
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'
    const body = JSON.stringify({
        TableName: 'Billing',
        Item: {
            lineItems: Object.keys(values).map(k => values[k]),
            recipientInfo: {
                name: "Relson Gracie Jiu-Jitsu Cleveland LLC",
                address1: "4679 Hamann Parkway",
                address2: "Willoughby, OH 44094",
                phone: "440-942-7179",
            },
            invoiceNum: 460,
        },
    })

    axios.post(url, body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const getAmountOwed = (values: LineItemMap, id: string): number => values[id].amount * values[id].percentage / 100 || 0
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
    const setServiceDate = (e: any) => setFieldValue(`[${id}].serviceDate`, e.target.value)
    const setDescription = (e: any) => setFieldValue(`[${id}].description`, e.target.value)
    const dollarsAndCentsArray = values[id].amount.toString().split('.')
    const dollars = parseFloat(dollarsAndCentsArray[0])
    const cents = dollarsAndCentsArray.length > 1 ? parseFloat(dollarsAndCentsArray[1]) : 0
    const setamountDollars = (e: any) => setFieldValue(`[${id}].amount`, parseFloat(`${e.target.value}.${cents}`))
    const setamountCents = (e: any) => setFieldValue(`[${id}].amount`, parseFloat(`${dollars}.${e.target.value}`))
    const setPercentage = (e: any) => setFieldValue(`[${id}].percentage`, parseFloat(e.target.value))
    const amountOwed = getAmountOwed(values, id)


    return (<>
        <tr>
            <td>
                <Field name='serviceDate' onChange={setServiceDate} value={values[id].serviceDate}/>
            </td>
            <td>
                <Field className='description-input' name='description' onChange={setDescription} value={values[id].description}/>
            </td>
            <td>
                <Field className='dollars-input' name='amount' onChange={setamountDollars} value={dollars || 0.00}/>.
                <Field className='cents-input' name='amount' onChange={setamountCents} value={cents || 0.00}/>
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

const BIllingForm: React.SFC<BIllingFormProps> = ({ selectedRecipient }) => {
    const formValues = {
        '1':
            {
                id: '1',
                serviceDate: '',
                description: '',
                amount: 0.00,
                percentage: 0,
            },
        '2':
            {
                id: '2',
                serviceDate: '',
                description: '',
                amount: 0.00,
                percentage: 0,
            },
        '3':
            {
                id: '3',
                serviceDate: '',
                description: '',
                amount: 0.00,
                percentage: 0,
            },
        '4':
            {
                id: '4',
                serviceDate: '',
                description: '',
                amount: 0,
                percentage: 0,
            },

    }

    // const submitForm = (values: any, actions: any) => console.log('SUBMIT', {values}, {actions})

    return (
        <div className='container'>

          <Formik
            initialValues={formValues}
            onSubmit={handleSubmit}
            render={({ values, setFieldValue }) => (
                <Form>
                <LineItems
                    values={values}
                    setFieldValue={setFieldValue}
                />
                <Field type="submit" value="Submit" />
                
              </Form>
            )}
          />
        </div>
      )
}

export default BIllingForm