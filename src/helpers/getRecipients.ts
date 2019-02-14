import axios from 'axios'
import { get, uniq } from 'lodash'

const getAllocations = (defaultSourceIds, allSourceIds, defaultPercentage) =>
 allSourceIds.map(
  sourceId => ({
    sourceId,
    allocated: defaultSourceIds.includes(sourceId),
    percentage: defaultPercentage,
  })
)

const getRecipients = async () => {
  const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/recipients'
  
  const response = await axios.get(url)

  const items = get(response, 'data.Items', [])

  const allSourceIds = uniq(items.reduce((acc, item) => {
    return [...acc, ...item.defaultSourceIds]
  }, []))


  const result = items.map(
    item => ({...item, allocations: getAllocations(item.defaultSourceIds, allSourceIds, item.defaultPercentage )})
  )

  return result
}

export default getRecipients
