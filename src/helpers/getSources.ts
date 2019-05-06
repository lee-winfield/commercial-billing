import axios from 'axios'
import { get } from 'lodash'

const getSources = async () => {
  const url = 'https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/sources'
  const response = await axios.get(url)

  const items = get(response, 'data.Items', [])
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
