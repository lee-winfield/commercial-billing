import { reduce, find, map } from 'lodash'

const formatValuesForDocuments = (values, nextInvoiceNum ) => {
  const { recipients, sources } = values
  
  const makeDocumentForRecipient = (recipient, index) => {
    const { allocations, name, address1, address2, phone } = recipient
    const generateLineItems = () => 
      reduce(allocations, (acc, allocation) => {
        const { sourceId, allocated, percentage } = allocation
        if (allocated) {
          const source = find(sources, ['id', sourceId])
          const { serviceDate, name, amount, included } = source
          if (included) {
            const res =[
              ...acc,
              {
                serviceDate,
                name,
                amount,
                recipientCharge: amount * percentage / 100,
              },
            ]

            return res
          }
        }
        
        return acc
      }, [])
    

    const invoiceNum = nextInvoiceNum + index
    const lineItems = generateLineItems()
    const recipientInfo = { name, address1, address2, phone }
    const location = `https://s3.us-east-2.amazonaws.com/cjwinfield/relson_gracie/${invoiceNum}.pdf`
    
    const document = {
      invoiceNum,
      lineItems,
      recipientInfo,
      location,
    }


    return document
  }

  const documents = map(recipients, makeDocumentForRecipient)

  return documents
}

export default formatValuesForDocuments
