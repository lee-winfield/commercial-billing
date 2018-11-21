const getNextInvoiceNum = (bills) => {
  const numbers = bills.map(bill => bill.invoiceNum)
  return bills ? Math.max.apply(null, numbers) + 1 : 45
}
export default getNextInvoiceNum