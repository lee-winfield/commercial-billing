import { reduce, filter } from 'lodash'

const validate = (values) => {
  const { recipients, sources } = values

  const getSourceError = (acc, source) => {
    const { included, serviceDate, name, amount} = source
    if (!included) {
      return acc
    }
    if (serviceDate.length === 0 || name.length === 0 || amount > 0) {
      return {...acc, sources: 'Error: All checked sourced must have values for Bill Source, Service Date Range, and Total Charged' }
    }
    return acc
  }
  const sourceErrors = reduce(sources, getSourceError, {})

  const getRecipientError = (acc, recipient) => {
    const { allocations, included } = recipient
    if (!included) {
      return acc
    }
    const filteredAllocations = filter(allocations, ['allocated', true])
    if (filteredAllocations.length === 0) {
      return {...acc, recipients: 'Error: Included recipients must have atleast one allocation'}
    }

    return acc
  }
  const recipientErrors = reduce(recipients, getRecipientError, {})


  return { ...recipientErrors, ...sourceErrors };
};

export default validate