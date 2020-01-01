import { reduce, filter } from 'lodash'
import { RecipientInterface } from './getRecipients';
import { SourceInterface } from './getSources';


const validate = (values: {
  recipients: RecipientInterface[],
  sources: SourceInterface[],
}) => {
  const { recipients, sources } = values

  const getSourceError = (acc: Record<string,string>, source: SourceInterface) => {
    const { serviceDate, name, amount } = source

    if (serviceDate.length === 0 || name.length === 0 || amount === 0) {
      return {...acc, sources: 'Error: All checked sourced must have values for Bill Source, Service Date Range, and Total Charged' }
    }
    return acc
  }
  const filteredSources = filter(sources, ['included', true])
  const sourceErrors = filteredSources.length === 0 ?
    { sources: 'Error: There must be atleast one bill source' }
  :
    reduce(filteredSources, getSourceError, {})

  const getRecipientError = (acc: Record<string,string>, recipient: RecipientInterface) => {
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