import * as React from 'react'
import { findIndex, filter } from 'lodash'


const BillSourceInputs = ({ billSource, setFieldValue, values }) => {
  const { id, name, included, amount } = billSource

  const index = findIndex(values.sources, ['id', id])
  const updateAllocations = () => {
    if (!included) {
      values.recipients.forEach(recipient => {
        const { allocations, defaultPercentage } = recipient
        const recipientIndex = findIndex(values.recipients, ['id', recipient.id])
        const updatedAllocations = [...allocations, { sourceId: id, allocated: true, percentage: defaultPercentage } ]
        setFieldValue(`recipients[${recipientIndex}].allocations`, updatedAllocations)
      })
    } else {
      values.recipients.forEach(recipient => {
        const { allocations } = recipient
        const recipientIndex = findIndex(values.recipients, ['id', recipient.id])
        const updatedAllocations = filter(allocations, ({ sourceId }) => sourceId !== id)
        setFieldValue(`recipients[${recipientIndex}].allocations`, updatedAllocations)
      }) 
    }
  }
  const toggleCheckBox = () => {
    updateAllocations()
    setFieldValue(`sources[${index}].included`, !included )
  }
  const setName = (e) => {
    setFieldValue(`sources[${index}].name`, e.target.value)
  }
  const setAmount = (e) => {
    setFieldValue(`sources[${index}].amount`, e.target.value)
  }

  return (
    <div>
      <input type='checkbox' value={id} checked={included} onChange={toggleCheckBox} />
      <input type='text' value={name} onChange={setName} disabled={!included} />
      <input type='number' value={amount} onChange={setAmount} disabled={!included} />
      <br/>
    </div>
  )
}
const BillSourceForm = ({ values, setFieldValue }) => {
  const { sources } = values
  return (<>
    {sources.map(
      billSource => (<BillSourceInputs
        key={billSource.id}
        billSource={billSource}
        setFieldValue={setFieldValue}
        values={values}
      />)
    )}
  </>)
}

export default BillSourceForm
