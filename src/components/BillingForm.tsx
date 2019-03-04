import * as React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
import '@material/dialog/dist/mdc.dialog.css';
import '@material/button/dist/mdc.button.css';
import { Button } from '@rmwc/button';
import axios from 'axios'
import { Formik, Form, FormikActions } from 'formik';
import BillSourceForm from './BillSourceForm';
import RecipientForm from './RecipientForm';
import Confirmation from './Confirmation';
import formatValuesForDocuments from '../helpers/formatValuesForDocuments';
import validate from '../helpers/validate';
import { isEmpty } from  'lodash'
import getRecipients from 'src/helpers/getRecipients';
import getSources from 'src/helpers/getSources';
const { useState, useEffect } = React

const Stepper = ({ values, errors, setFieldValue, step }) => {
    // TODO: get nextInvoiceNum
  const nextInvoiceNum = 0
  const documents = formatValuesForDocuments(values, nextInvoiceNum)
  switch (step) {
    case 1: return (
      <BillSourceForm values={values} setFieldValue={setFieldValue} />
    )
    case 2: return (
      <RecipientForm values={values} setFieldValue={setFieldValue} />
    )
    case 3: return (
      <Confirmation documents={documents} errors={errors} />
    )
    default: return null
  }
}

const BillingForm: React.SFC<any> = (props) => {
  const [ step, setStep ] = useState(1)
  const [ recipients, setRecipients ] = useState([])
  const [ sources, setSources ] = useState([])

  async function initialize() {
    const recipients = getRecipients()
    const sources = getSources()

    setRecipients(await recipients)
    setSources(await sources)

    window.onbeforeunload = () => "Are you certain that you want to leave? Work may be lost"  
  }

  useEffect( () => {
    initialize()
  }, [])

  const nextStep = () => setStep(step + 1)
  const previousStep = () => setStep(step - 1)
  const resetStepper = () => setStep(1)
  const stepHeadingMap = {
    1: 'Step 1: Add Bill Source',
    2: 'Step 2: Allocate to Recipients',
    3: 'Step 3: Confirmation',
  }

  const FormButtons = () => (
    <>
      <Button onClick={() => null} >Close</Button>
      { step > 1 ? <Button onClick={previousStep} >Previous</Button> : null}
      { step < 3 ? <Button onClick={nextStep} >Next</Button> : null}
      { step === 3 ? <Button type='submit' >Confirm</Button> : null}
    </>
  )
 
  const formValues = {
    sources,
    recipients, 
  }

  const handleSubmit = async (values: any, actions: FormikActions<any>) => {
    // TODO: get nextInvoiceNum
    const nextInvoiceNum = 0
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'
    const documents = formatValuesForDocuments(values, nextInvoiceNum)
    const isValid = await actions.validateForm(values)
    await documents.forEach(async (document) => {
      const { invoiceNum, lineItems, recipientInfo, location, createdOn } = document
      const body = JSON.stringify({
        TableName: 'Billing',
        Item: {
          invoiceNum, lineItems, recipientInfo, location, createdOn,
        },
      })
      await axios.post(url, body)
      // addBill(document)
    })

    if (isEmpty(isValid)) {
      resetStepper()
      actions.resetForm()
    }
  }

  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleSubmit}
      validate={validate}
      enableReinitialize
      render={({ values, errors, setFieldValue }) =>
      (
        <Form>
          <DialogTitle>
            {stepHeadingMap[step]}
          </DialogTitle>
          <DialogContent>
            <Stepper values={values} errors={errors} setFieldValue={setFieldValue} step={step} />
          </DialogContent>
          <DialogActions>
            <FormButtons />
          </DialogActions>
        </Form>
      )}
    />
  )
}

export default BillingForm