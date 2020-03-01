import * as React from 'react'
import { findIndex, find } from 'lodash'
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import { Typography } from '@rmwc/typography';
import {
  DataTable,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableContent
} from '@rmwc/data-table';
import '@material/typography/dist/mdc.typography.css';
import '@rmwc/data-table/data-table.css';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/grid-list/dist/mdc.grid-list.css';
import {
  Card,
} from '@rmwc/card';
import {
  GridList,
  GridTile,
} from '@rmwc/grid-list';
import { AllocationInterface, RecipientInterface } from '../../helpers/getRecipients';

interface AllocationProps {
  recipientId: number;
  recipientIndex: number;
  allocation: AllocationInterface;
  allocations: AllocationInterface[];
  disabled: boolean;
  setFieldValue: (field: string, value: any) => undefined;
  values: any;
}

const Allocation = ({
  recipientId,
  recipientIndex,
  allocation,
  allocations,
  disabled,
  setFieldValue,
  values,
}: AllocationProps) => {
  const { sourceId, allocated, percentage } = allocation
  const allocationIndex = findIndex(allocations, ['sourceId', sourceId])
  const source = find(values.sources, ['id', sourceId])

  const toggleCheckBox = () => {
    setFieldValue(`recipients[${recipientIndex}].allocations[${allocationIndex}].allocated`, !allocated)
  }
  const setPercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(`recipients[${recipientIndex}].allocations[${allocationIndex}].percentage`, e.target.value)
  }

  return disabled ? null : (
    <DataTableRow>
      <DataTableCell>
        <input type='checkbox' value={`${recipientId}-${sourceId}`} checked={allocated} onChange={toggleCheckBox} />
        <span>
          {source.name}
        </span>
      </DataTableCell>
      <DataTableCell>
        <input style={{ width: '45px' }} type='number' value={percentage} onChange={setPercentage} disabled={!allocated} />
      </DataTableCell>
    </DataTableRow>
  )
}

interface AllocationInputsProps {
  disabled: boolean;
  allocations: AllocationInterface[];
  recipientId: number;
  recipientIndex: number;
  values: any;
  setFieldValue: (field: string, value: any) => undefined
}

const AllocationInputs = ({
  disabled,
  allocations,
  recipientId,
  recipientIndex,
  values,
  setFieldValue,
}: AllocationInputsProps) => {

  return (
    <DataTable>
      <DataTableContent>
        <DataTableBody>
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
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  )
}

interface RecipientInputsProps {
  recipient: RecipientInterface;
  values: any;
  setFieldValue: (field: string, value: any) => undefined;
}

const RecipientInputs = ({
  recipient,
  setFieldValue,
  values,
}: RecipientInputsProps) => {
  const { id, name, included, allocations } = recipient

  const index = findIndex(values.recipients, ['id', id])
  const toggleCheckBox = () => {
    setFieldValue(`recipients[${index}].included`, !included )
  }


  return (
    <Card>
      <Grid>
        <GridCell span={12}>
          <input type='checkbox' value={id} checked={included} onChange={toggleCheckBox} />
          <Typography use='headline6'>
            {name}
          </Typography>
        </GridCell>
        <GridCell span={12}>
          <AllocationInputs
            disabled={!included}
            allocations={allocations}
            recipientId={id}
            recipientIndex={index}
            setFieldValue={setFieldValue}
            values={values}
          />
        </GridCell>
      </Grid>
    </Card>
  )
}

interface RecipientFormProps {
  values: {recipients: RecipientInterface[]};
  setFieldValue: (field: string, value: any) => undefined;
}
const RecipientForm = ({ values, setFieldValue }: RecipientFormProps) => {
  const { recipients } = values

  return (
    <GridList>
      {recipients.map(
        recipient => (
          <GridTile key={recipient.id} style={{ width: 'fit-content' }}>
            <RecipientInputs
              key={recipient.id}
              recipient={recipient}
              setFieldValue={setFieldValue}
              values={values}
            />
          </GridTile>
        )
      )}
    </ GridList>
  )
}

export default  RecipientForm
