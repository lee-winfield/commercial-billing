
import { map } from 'lodash'

const getNextInvoiceNum = (bills) => {
  const numbers = map(bills, bill => bill.invoiceNum)
  return bills && bills.length > 0 ? Math.max.apply(null, numbers) + 1 : 1000
}
export default getNextInvoiceNum