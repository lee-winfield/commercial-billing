import * as React from 'react'
import { findIndex, find } from 'lodash'
import { Grid, GridCell } from '@rmwc/grid';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import { Typography } from '@rmwc/typography';
import {
  DataTable,
  DataTableBody,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';
import '@material/typography/dist/mdc.typography.css';
import '@rmwc/data-table/data-table.css';
import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActionButton,
  CardActionIcon,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@rmwc/card';


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
    <DataTableRow>
      <DataTableCell>
        <input type='checkbox' value={`${recipientId}-${sourceId}`} checked={allocated} onChange={toggleCheckBox} />
        <span>
          {source.name}
        </span>
      </DataTableCell>
      <DataTableCell>
        <input type='number' value={percentage} onChange={setPercentage} disabled={!allocated} />
      </DataTableCell>
    </DataTableRow>
  )
}

const AllocationInputs = ({ disabled, allocations, recipientId, recipientIndex, values, setFieldValue }) => {

  return (
    <DataTable>
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
    </DataTable>
  )
}


const RecipientInputs = ({ recipient, setFieldValue, values }) => {
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
