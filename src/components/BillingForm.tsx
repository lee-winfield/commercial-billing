import * as React from 'react'
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import { Typography } from '@rmwc/typography';
import '@material/button/dist/mdc.button.css';
import '@material/typography/dist/mdc.typography.css';
import { Button } from '@rmwc/button';
import axios from 'axios'
import { Formik, Form, FormikHelpers } from 'formik';
import BillSourceForm from './BillSourceForm';
import RecipientForm from './RecipientForm';
import Submission from './Submission';
import formatValuesForDocuments from '../helpers/formatValuesForDocuments';
import validate from '../helpers/validate';
import { isEmpty } from  'lodash'
import getRecipients, { RecipientInterface } from '../helpers/getRecipients';
import getSources, { SourceInterface } from '../helpers/getSources';
import { BillingContext, BillingContextInterface } from '../context/BillingContextProvider';
import getNextInvoiceNum from '../helpers/getNextInvoiceNum';
import { LinkButton } from './LinkButton';
import { Prompt, Redirect } from 'react-router-dom'
const { useState, useEffect, useContext } = React

interface StepperProps {
  values: any;
  errors: any;
  setFieldValue: any;
  step: number;
}

const Stepper = ({ values, errors, setFieldValue, step }: StepperProps) => {
  const documents = formatValuesForDocuments(values)
  switch (step) {
    case 1: return (
      <BillSourceForm values={values} setFieldValue={setFieldValue} />
    )
    case 2: return (
      <RecipientForm values={values} setFieldValue={setFieldValue} />
    )
    case 3: return (
      <Submission documents={documents} errors={errors} />
    )
    default: return null
  }
}

const BillingForm: React.SFC<any> = (props) => {
  const { bills, setBills } = useContext<BillingContextInterface>(BillingContext)
  const [ step, setStep ] = useState<number>(1)
  const [ recipients, setRecipients ] = useState<RecipientInterface[]>([])
  const [ sources, setSources ] = useState<SourceInterface[]>([])
  const [ redirect, setRedirect ] = useState<boolean>(false)

  async function initialize() {
    const recipients = getRecipients()
    const sources = getSources()

    setRecipients(await recipients)
    setSources(await sources)
  }

  useEffect( () => {
    initialize()
    if (!redirect) {
      window.onbeforeunload = () => "Are you certain that you want to leave? Work may be lost"
    }
  }, [redirect])

  const nextStep = () => setStep(step + 1)
  const previousStep = () => setStep(step - 1)

  const stepHeadingMap: Record<number, string> = {
    1: 'Step 1: Add Bill Source',
    2: 'Step 2: Allocate to Recipients',
    3: 'Step 3: Submission',
  }

  const FormButtons = () => (
    <>
      <LinkButton to='/billing' label='Go Home' icon={null} />
      { step > 1 ? <Button onClick={previousStep} >Previous</Button> : null}
      { step < 3 ? <Button onClick={nextStep} >Next</Button> : null}
      { step === 3 ? <Button type='submit' >Submit</Button> : null}
    </>
  )

  const nextInvoiceNum = bills ? getNextInvoiceNum(bills) : null

  const formValues = {
    sources,
    recipients,
    nextInvoiceNum,
  }

  const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
    const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'
    const documents = formatValuesForDocuments(values)
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
      if (bills) {
        setBills([...bills, document])
      }
    })

    if (isEmpty(isValid)) {
      actions.resetForm()
      setRedirect(true)
    }
  }

  return (
    <>
      {!redirect ? <Prompt
        when={true}
        message={location => 'Are you sure you want to go to leave this page?'}
      /> : null}
      {redirect ? <Redirect to='/billing' /> : null}
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        validate={validate}
        enableReinitialize
        render={({ values, errors, setFieldValue }) =>
        (
          <Form>
            <Grid>
              <GridCell span={12}>
                <Typography use='headline6'>
                  {stepHeadingMap[step]}
                </Typography>
              </GridCell>
              <GridCell span={12} style={{ margin: '0px', paddingTop: '0px', paddingBottom: '0px' }}>
                <FormButtons />
              </GridCell>
            </Grid>
            <Grid>
              <GridCell span={12}>
                <Stepper values={values} errors={errors} setFieldValue={setFieldValue} step={step} />
              </GridCell>
            </Grid>
          </Form>
        )}
      />
    </>
  )
}

export default BillingForm