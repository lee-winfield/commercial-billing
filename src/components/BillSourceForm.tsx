import * as React from 'react'
import { findIndex } from 'lodash'


const BillSourceInputs = ({ billSource, setFieldValue, values }) => {
  const { id, name, value, amount } = billSource

  const index = findIndex(values.sources, ['id', id])
  const toggleCheckBox = () => {
    setFieldValue(`sources[${index}].value`, !value )
  }
  const setName = (e) => {
    setFieldValue(`sources[${index}].name`, e.target.value)
  }
  const setAmount = (e) => {
    setFieldValue(`sources[${index}].amount`, e.target.value)
  }

  return (
    <div>
      <input type='checkbox' value={id} checked={value} onChange={toggleCheckBox} />
      <input type='text' value={name} onChange={setName} disabled={!value} />
      <input type='number' value={amount} onChange={setAmount} disabled={!value} />
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
