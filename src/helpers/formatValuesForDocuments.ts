import { reduce, find, map, filter } from 'lodash'
import { LineItemInterface } from './getBills'
import { RecipientInterface } from './getRecipients'
import { SourceInterface } from './getSources'
import { getCurrentMonth } from './getCurrentMonth'

export interface DocumentInterface {
  lineItems: LineItemInterface[];
  invoiceNum: number;
  recipientInfo: RecipientInterface;
  recipientName?: string;
  createdOn: Date;
  location: string;
  fileName: string;
}

const formatValuesForDocuments: (values: {
  recipients: RecipientInterface[],
  sources: SourceInterface[],
  nextInvoiceNum: number;
}) => DocumentInterface[] = (values) => {
  const { recipients, sources, nextInvoiceNum } = values

  const makeDocumentForRecipient: (recipient: RecipientInterface, index: number) => DocumentInterface = (recipient, index) => {
    const { allocations, name, address1, address2, phone, id } = recipient
    const invoiceNum = nextInvoiceNum + index
    const lineItems = reduce(allocations, (acc: LineItemInterface[], allocation) => {
      const { sourceId, allocated, percentage } = allocation
      if (allocated) {
        const source = find(sources, ['id', sourceId]) || {} as SourceInterface
        const { serviceDate, name, amount, included } = source
        if (included) {
          const res =[
            ...acc,
            {
              serviceDate,
              name,
              amount: amount/100,
              percentage,
              recipientCharge: amount && Number(amount) * percentage / 100 /100,
            },
          ]

          return res
        }
      }

      return acc
    }, []) as LineItemInterface[]

    const recipientInfo = { name, address1, address2, phone, id } as RecipientInterface
    const fileName = `${recipientInfo.name}-${getCurrentMonth()}-${invoiceNum}`
    const location = `https://s3.us-east-2.amazonaws.com/cjwinfield/recipient/${fileName}.pdf`

    const document = {
      invoiceNum,
      lineItems,
      recipientInfo,
      location,
      fileName,
      createdOn: new Date(),
    }


    return document
  }

  const filteredRecipients = filter(recipients, ['included', true])
  const documents = map(filteredRecipients, makeDocumentForRecipient)

  return documents
}

export default formatValuesForDocuments
