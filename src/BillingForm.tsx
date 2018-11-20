import * as React from 'react'
import {
    Field,
    Form,
    Formik,
    FormikActions,
} from 'formik'
import { RecipientOption } from './LandingPage'
import { omit, isEmpty } from 'lodash'
import axios from 'axios'
import getRecipientInfo from './helpers/getRecipientInfo'
import getFormValues from './helpers/getFormValues'
import { LineItems } from './LineItems'

export interface BIllingFormProps {
  selectedRecipient: RecipientOption | null
  invoiceNum: number
}

const getFormattedLineItems = (values: any) =>
  Object.keys(values).reduce((acc, key) => {
    const hasDescription = !isEmpty(values[key].description) && values[key].description.length > 0 
    const hasAmount = typeof values[key].amount === 'number' && values[key].amount > 0
    const isBlank = !hasDescription || !hasAmount

    return isBlank ? acc : [ ...acc, omit(values[key], ['id'])]
  }, [])

const BIllingForm: React.SFC<BIllingFormProps> = ({ selectedRecipient, invoiceNum }) => {
  const formValues = getFormValues(selectedRecipient.value)

  const recipientInfo = getRecipientInfo(selectedRecipient.value)
  const handleSubmit = (values: any, actions: FormikActions<any>) => {
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'
    const body = JSON.stringify({
      TableName: 'Billing',
      Item: {
        invoiceNum,
        lineItems: getFormattedLineItems(values),
        recipientInfo,
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

  return (
    <>
      <h2>{selectedRecipient.label}</h2>
      <h3>Invoice number: {invoiceNum}</h3>
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
    </>
  )
}

export default BIllingForm