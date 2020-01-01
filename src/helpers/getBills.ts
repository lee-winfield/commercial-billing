import { get, sortBy } from 'lodash'
import axios from 'axios'
import { DocumentInterface } from './formatValuesForDocuments'

export interface LineItemInterface {
  serviceDate: string;
  name: string;
  amount: number;
  percentage: number;
  recipientCharge: number;
}



const getBills: () => Promise<DocumentInterface[]> = async () => {
  const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/commercialBillingApi'

  const response = await axios.get(url)
  const bills = sortBy(get(response, 'data.Items', []), ['invoiceNum']).reverse()

  return bills
}

export default getBills