import { reduce, find, map, filter } from 'lodash'

const formatValuesForDocuments = (values, nextInvoiceNum ) => {
  const { recipients, sources } = values
  
  const makeDocumentForRecipient = (recipient, index) => {
    const { allocations, name, address1, address2, phone, id } = recipient
    const generateLineItems = () => 
      reduce(allocations, (acc, allocation) => {
        const { sourceId, allocated, percentage } = allocation
        if (allocated) {
          const source = find(sources, ['id', sourceId]) || {}
          const { serviceDate, name, amount, included } = source
          if (included) {
            const res =[
              ...acc,
              {
                serviceDate,
                name,
                amount,
                percentage,
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
    const recipientInfo = { name, address1, address2, phone, id }
    const location = `https://s3.us-east-2.amazonaws.com/cjwinfield/recipient/${invoiceNum}.pdf`
    
    const document = {
      invoiceNum,
      lineItems,
      recipientInfo,
      location,
      createdOn: new Date(),
    }


    return document
  }

  const filteredRecipients = filter(recipients, ['included', true])
  const documents = map(filteredRecipients, makeDocumentForRecipient)

  return documents
}

export default formatValuesForDocuments
