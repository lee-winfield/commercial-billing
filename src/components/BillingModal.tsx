import * as React from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { Formik, Form, FormikActions } from 'formik';
import BillSourceForm from './BillSourceForm';
import RecipientForm from './RecipientForm';
import Confirmation from './Confirmation';
import formatValuesForDocuments from '../helpers/formatValuesForDocuments';
import validate from '../helpers/validate';
import { isEmpty } from  'lodash'
const { useState } = React

const BillingModal: React.SFC<any> = (props) => {
  const [ step, setStep ] = useState(1)
  const { isBillingModalOpen, nextInvoiceNum, closeModal, recipients, sources, addBill } = props
    
  const nextStep = () => setStep(step + 1)
  const previousStep = () => setStep(step - 1)
  const resetStepper = () => setStep(1)
  const stepHeadingMap = {
    1: 'Step 1: Add Bill Source',
    2: 'Step 2: Allocate to Recipients',
    3: 'Step 3: Confirmation',
  }
  const Stepper = ({ values, errors, setFieldValue }) => {
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

  const FormButtons = () => (
    <>
      <Button onClick={closeModal} >Close</Button>
      { step > 1 ? <Button onClick={previousStep} >Previous</Button> : null}
      { step < 3 ? <Button onClick={nextStep} bsStyle="primary">Next</Button> : null}
      { step === 3 ? <Button type='submit' bsStyle="primary">Confirm</Button> : null}
    </>
  )

  const formValues = {
    sources,
    recipients, 
  }

  const handleSubmit = async (values: any, actions: FormikActions<any>) => {
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
      addBill(document)
    })

    if (isEmpty(isValid)) {
      closeModal()
      resetStepper()
      actions.resetForm()
    }
  }

  return (
    <Modal
      show={isBillingModalOpen}
      dialogComponentClass='billing-modal'
      >
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        validate={validate}
        render={({ values, errors, setFieldValue }) =>
        (
          <Form>
        <Modal.Dialog
          dialogClassName='billing-modal'
        >
          <Modal.Header>
            <Modal.Title>{stepHeadingMap[step]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stepper values={values} errors={errors} setFieldValue={setFieldValue} />
          </Modal.Body>
          <Modal.Footer>
            <FormButtons />
          </Modal.Footer>
        </Modal.Dialog>
       </Form>
        )}
      />
    </Modal>
  )
}

export default BillingModal