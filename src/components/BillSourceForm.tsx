import * as React from 'react'
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';
import '@rmwc/data-table/data-table.css';

import { findIndex, filter } from 'lodash'


const BillSourceInputs = ({ billSource, setFieldValue, values }) => {
  const { id, serviceDate, name, included, amount } = billSource

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
  const setServiceDate = (e) => {
    setFieldValue(`sources[${index}].serviceDate`, e.target.value)
  }
  const setAmount = (e) => {
    setFieldValue(`sources[${index}].amount`, e.target.value)
  }

  return (
    <DataTableRow>
      <DataTableCell>
        <input type='checkbox' value={id} checked={included} onChange={toggleCheckBox} />
      </DataTableCell>
      <DataTableCell>
        <input type='text' value={serviceDate} onChange={setServiceDate} disabled={!included} />
      </DataTableCell>
      <DataTableCell>
        <input type='text' value={name} onChange={setName} disabled={!included} />
      </DataTableCell>
      <DataTableCell>
        <input type='number' value={amount} onChange={setAmount} disabled={!included} />
      </DataTableCell>
    </DataTableRow>
  )
}
const BillSourceForm = ({ values, setFieldValue }) => {
  const { sources } = values

  return (<DataTable>
    <DataTableContent>
      <DataTableHead>
        <DataTableRow>
          <DataTableHeadCell>Included</DataTableHeadCell>
          <DataTableHeadCell>Service Date Range</DataTableHeadCell>
          <DataTableHeadCell>Bill Source</DataTableHeadCell>
          <DataTableHeadCell>Total Charged</DataTableHeadCell>
        </DataTableRow>
      </DataTableHead>
      <DataTableBody>
        {sources.map(
          billSource => (<BillSourceInputs
            key={billSource.id}
            billSource={billSource}
            setFieldValue={setFieldValue}
            values={values}
          />)
        )}
      </DataTableBody>
    </DataTableContent>
  </DataTable>)
}

export default BillSourceForm
