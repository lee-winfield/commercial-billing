import * as React from 'react'
import { filter, map, reduce, find } from 'lodash'

const formatValuesForDocument = values => {
  const { recipients, sources } = values
  
  const makeDocumentForRecipient = recipient => {
    const { allocations } = recipient
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
    

    const invoiceNum = 1
    const lineItems = generateLineItems()
    const recipientInfo = {}
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

// const TablePreview = () => {

// }

const Confirmation = ({ values, setFieldValue }) => {
  const documents = formatValuesForDocument(values)
  console.log('Documents: ', documents)

  return (<>
    Confirmation
  </>)
}

export default Confirmation
