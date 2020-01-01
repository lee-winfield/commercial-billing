import axios from 'axios'
import { get } from 'lodash'

export interface SourceInterface {
  id: number;
  serviceDate: string;
  name: string;
  included: boolean;
  amount: number;
}

const getSources: () => Promise<SourceInterface[]> = async () => {
  const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/sources'
  const response = await axios.get(url)

  const items = get(response, 'data.Items', []) as SourceInterface[]
  const sourceQty = items.length

  const sources = items.map(
    (item) => ({
      ...item,
      serviceDate: '',
      included: true,
      amount: 0,
    })
  )
  const blankSources = [
    {
      id: sourceQty,
      serviceDate: '',
      name: '',
      included: false,
      amount: 0,
    },
    {
      id: sourceQty + 1,
      serviceDate: '',
      name: '',
      included: false,
      amount: 0,
    },
    {
      id: sourceQty + 2,
      serviceDate: '',
      name: '',
      included: false,
      amount: 0,
    },
  ]

  return [...sources, ...blankSources].sort((x, y)=> x.id - y.id)
}

export default getSources
