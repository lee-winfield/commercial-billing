import { get, sortBy } from 'lodash'
import axios from 'axios'

const getBills = async () => {
  const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'
  
  const response = await axios.get(url)
  const bills = sortBy(get(response, 'data.Items', []), ['invoiceNum']).reverse()

  return bills
}

export default getBills