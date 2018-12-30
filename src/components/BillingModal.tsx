import * as React from 'react'
import { Modal, Button } from 'react-bootstrap'
import LandingPage from '../LandingPage'
import { Formik, Form } from 'formik';
import BillSourceForm from './BillSourceForm';
import RecipientForm from './RecipientForm';
import Confirmation from './Confirmation';
import formatValuesForDocuments from '../helpers/formatValuesForDocuments';

class BillingModal extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state ={
      step: 1,
    }
  }

  render() {
    const { isBillingModalOpen, nextInvoiceNum, closeModal } = this.props
    
    const { step } = this.state
    const nextStep = () => this.setState({ step: step + 1 })
    const previousStep = () => this.setState({ step: step - 1 })
    const stepHeadingMap = {
      1: 'Step 1: Add Bill Source',
      2: 'Step 2: Allocate to Recipients',
      3: 'Step 3: Confirmation',
    }
    const Stepper = ({ values, setFieldValue }) => {
      const documents = formatValuesForDocuments(values)
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

    const sources = [
      {
        id: 0,
        serviceDate: '',
        name: 'Dominion',
        included: true,
        amount: 0,
      },
      {
        id: 1,
        serviceDate: '',
        name: 'Illuminating',
        included: true,
        amount: 0,
      },
      {
        id: 2,
        serviceDate: '',
        name: 'Waste Management',
        included: true,
        amount: 0,
      },
      {
        id: 3,
        serviceDate: '',
        name: '',
        included: false,
        amount: 0,
      },
      {
        id: 4,
        serviceDate: '',
        name: '',
        included: false,
        amount: 0,
      },
    ]

    const recipients = [
      {
        name: 'C.J. Winfield Properties',
        id: 0,
        defaultPercentage: 22,
        included: true,
        allocations: [
          {
            sourceId: 0,
            allocated: true,
            percentage: 22,
          },
          {
            sourceId: 1,
            allocated: true,
            percentage: 22,
          },
          {
            sourceId: 2,
            allocated: true,
            percentage: 22,
          },
        ],
      },
      {
        name: 'Relson Gracie Jiu Jitsu',
        id: 1,
        defaultPercentage: 56,
        included: true,
        allocations: [
          {
            sourceId: 0,
            allocated: true,
            percentage: 56,
          },
          {
            sourceId: 1,
            allocated: true,
            percentage: 56,
          },
          {
            sourceId: 2,
            allocated: true,
            percentage: 56,
          },
        ],
      },
    ]

    const formValues = {
      sources,
      recipients, 
    }
    const handleSubmit = () => console.log('submitting')

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