import * as React from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { Formik, Form, FormikActions } from 'formik';
import BillSourceForm from './BillSourceForm';
import RecipientForm from './RecipientForm';
import Confirmation from './Confirmation';
import formatValuesForDocuments from '../helpers/formatValuesForDocuments';

class BillingModal extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
    }
  }

  render() {
    const { isBillingModalOpen, nextInvoiceNum, closeModal, recipients, sources } = this.props
    
    const { step } = this.state
    const nextStep = () => this.setState({ step: step + 1 })
    const previousStep = () => this.setState({ step: step - 1 })
    const stepHeadingMap = {
      1: 'Step 1: Add Bill Source',
      2: 'Step 2: Allocate to Recipients',
      3: 'Step 3: Confirmation',
    }
    const Stepper = ({ values, setFieldValue }) => {
      const documents = formatValuesForDocuments(values, nextInvoiceNum)
      switch (step) {
        case 1: return (
          <BillSourceForm values={values} setFieldValue={setFieldValue} />
        )
        case 2: return (
          <RecipientForm values={values} setFieldValue={setFieldValue} />
        )
        case 3: return (
          <Confirmation documents={documents} />
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
      documents.forEach(async ({ invoiceNum, lineItems, recipientInfo, location }) => {
        const body = JSON.stringify({
          TableName: 'Billing',
          Item: {
            invoiceNum, lineItems, recipientInfo, location,
          },
        })
    
        const response = await axios.post(url, body)
        console.log(response)
      })
      closeModal()
    }

    return (
      <Modal
        show={isBillingModalOpen}
        dialogComponentClass='billing-modal'
        >
        <Formik
          initialValues={formValues}
          onSubmit={handleSubmit}
          render={({ values, setFieldValue }) =>
          (
            <Form>
          <Modal.Dialog
            dialogClassName='billing-modal'
          >
            <Modal.Header>
              <Modal.Title>{stepHeadingMap[step]}</Modal.Title>
            </Modal.Header>
      
            <Modal.Body>
              <Stepper values={values} setFieldValue={setFieldValue} />
              {/* <LandingPage bills={bills} /> */}
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
}


export default BillingModal