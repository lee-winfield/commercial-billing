import * as React from 'react'
import { findIndex, find } from 'lodash'

const Allocation = ({ recipientId, recipientIndex, allocation, allocations, disabled, setFieldValue, values }) => {
  const { sourceId, allocated, percentage } = allocation
  const allocationIndex = findIndex(allocations, ['sourceId', sourceId])
  const source = find(values.sources, ['id', sourceId])

  const toggleCheckBox = () => {
    setFieldValue(`recipients[${recipientIndex}].allocations[${allocationIndex}].allocated`, !allocated)
  }
  const setPercentage = (e) => {
    setFieldValue(`recipients[${recipientIndex}].allocations[${allocationIndex}].percentage`, e.target.value)
  }

  return disabled ? null : (
    <div>
      <br/>
      <input type='checkbox' value={`${recipientId}-${sourceId}`} checked={allocated} onChange={toggleCheckBox} />
      {source.name}
      <input type='number' value={percentage} onChange={setPercentage} disabled={!allocated} />
      <br/>
    </div>
  )
}

const AllocationInputs = ({ disabled, allocations, recipientId, recipientIndex, values, setFieldValue }) => {

  return (
    <>
      {allocations.map( allocation => (
        <Allocation
          key={`${recipientId}-${allocation.sourceId}`}
          recipientId={recipientId}
          recipientIndex={recipientIndex}
          allocation={allocation}
          allocations={allocations}
          disabled={disabled}
          setFieldValue={setFieldValue}
          values={values}
        />
      ))}
    </>
  )
}


const RecipientInputs = ({ recipient, setFieldValue, values }) => {
  const { id, name, included, allocations } = recipient

  const index = findIndex(values.recipients, ['id', id])
  const toggleCheckBox = () => {
    setFieldValue(`recipients[${index}].included`, !included )
  }


  return (
    <>
      <input type='checkbox' value={id} checked={included} onChange={toggleCheckBox} />
      {name}
      <AllocationInputs
        disabled={!included}
        allocations={allocations}
        recipientId={id}
        recipientIndex={index}
        setFieldValue={setFieldValue}
        values={values}
      />
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
