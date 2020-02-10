import axios from 'axios'
import { get, uniq } from 'lodash'

export interface AllocationInterface {
  sourceId: number;
  allocated: boolean;
  percentage: number;
}

export interface RecipientInterface {
  id: number;
  name: string;
  address1: string;
  address2: string;
  enail: string
  phone: string;
  included: boolean;
  defaultSourceIds: number[];
  defaultPercentage: number;
  allocations: AllocationInterface[];
}

const getAllocations = (defaultSourceIds: number[], allSourceIds: number[], defaultPercentage: number) =>
 allSourceIds.map(
  sourceId => {
    const allocated = defaultSourceIds.includes(sourceId)
    return {
      sourceId,
      allocated,
      percentage: allocated ? defaultPercentage : 0,
    }
  }
)

const getRecipients: () => Promise<RecipientInterface[]> = async () => {
  const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/recipients'

  const response = await axios.get(url)

  const items = get(response, 'data.Items', []) as RecipientInterface[]

  const allSourceIds = uniq(items.reduce((acc: number[], item) => {
    return [...acc, ...item.defaultSourceIds]
  }, []))


  const result = items.map(
    item => ({...item, allocations: getAllocations(item.defaultSourceIds, allSourceIds, item.defaultPercentage )})
  )

  return result
}

export default getRecipients
