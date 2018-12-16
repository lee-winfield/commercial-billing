
import { map } from 'lodash'

const getNextInvoiceNum = (bills) => {
  const numbers = map(bills, bill => bill.invoiceNum)
  return bills ? Math.max.apply(null, numbers) + 1 : 45
}
export default getNextInvoiceNum