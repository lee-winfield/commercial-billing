import * as React from 'react'
import { findIndex } from 'lodash'


const RecipientInputs = ({ recipient, setFieldValue, values }) => {
  const { id, name, included, percentage } = recipient

  const index = findIndex(values.recipients, ['id', id])
  const toggleCheckBox = () => {
    setFieldValue(`recipients[${index}].included`, !included )
  }
  const setPercentage = (e) => {
    setFieldValue(`recipients[${index}].percentage`, e.target.value)
  }

  return (
    <>
      <input type='checkbox' value={id} checked={included} onChange={toggleCheckBox} />
      {name}
      <input type='number' value={percentage} onChange={setPercentage} disabled={!included} />
      <br/>
    </>
  )
}
const RecipientForm = ({ values, setFieldValue }) => {
  const { recipients } = values

  return (<>
    {recipients.map(
      recipient => (<RecipientInputs
        key={recipient.id}
        recipient={recipient}
        setFieldValue={setFieldValue}
        values={values}
      />)
    )}
  </>)
}

export default  RecipientForm
