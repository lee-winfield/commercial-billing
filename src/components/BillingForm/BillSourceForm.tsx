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
import { SourceInterface } from '../../helpers/getSources';
import { RecipientInterface } from '../../helpers/getRecipients';
// const CurrencyInput = require('react-currency-input');
import CurrencyInput from '../CurrencyInput';

interface BillSourceInputsProps {
  billSource: SourceInterface;
  setFieldValue: (field: string, value: any) => undefined;
  values: {
    recipients: RecipientInterface[];
    sources: SourceInterface[];
  };
}

interface BillSourceFormProps {
  setFieldValue: (field: string, value: any) => undefined;
  values: {
    recipients: RecipientInterface[];
    sources: SourceInterface[];
  };
}

const BillSourceInputs = ({ billSource, setFieldValue, values }: BillSourceInputsProps) => {
  const { id, serviceDate, name, included, amount } = billSource

  const index = findIndex(values.sources, ['id', id])
  const updateAllocations = () => {
    if (!included) {
      values.recipients.forEach(recipient => {
        const { allocations, defaultPercentage } = recipient
        const recipientIndex = findIndex(values.recipients, ['id', recipient.id])
        //TODO: fix hacky solution below
        const updatedAllocations = [...allocations, { sourceId: id, allocated: defaultPercentage !== 100, percentage: defaultPercentage !== 100 ? defaultPercentage : 0 } ]
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
  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(`sources[${index}].name`, e.target.value)
  }
  const setServiceDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(`sources[${index}].serviceDate`, e.target.value)
  }
  const setAmount = (value: number) => {
    setFieldValue(`sources[${index}].amount`, value)
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
      <CurrencyInput value={amount} onChangeEvent={setAmount} disabled={!included}/>
      </DataTableCell>
    </DataTableRow>
  )
}
const BillSourceForm = ({ values, setFieldValue }: BillSourceFormProps) => {
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
