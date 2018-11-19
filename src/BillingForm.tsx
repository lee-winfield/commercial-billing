import * as React from 'react'
import {
    Field,
    Form,
    Formik,
    FormikActions,
} from 'formik'
import { RecipientOption } from './LandingPage'
import { omit } from 'lodash'
import axios from 'axios'
import getRecipientInfo from './helpers/getRecipientInfo'
import getFormValues from './helpers/getFormValues'
import { LineItems } from './LineItems'

export interface BIllingFormProps {
  selectedRecipient: RecipientOption | null
}

const BIllingForm: React.SFC<BIllingFormProps> = ({ selectedRecipient }) => {
  const formValues = getFormValues(selectedRecipient.value)

  console.log({selectedRecipient})
  const recipientInfo = getRecipientInfo(selectedRecipient.value)
  
  const handleSubmit = (values: any, actions: FormikActions<any>) => {
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'
    const body = JSON.stringify({
      TableName: 'Billing',
      Item: {
        invoiceNum: 461,
        lineItems: Object.keys(values).map(k => omit(values[k], ['id'])),
        recipientInfo,
      },
    })

    console.log({body})

    axios.post(url, body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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