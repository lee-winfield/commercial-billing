
const getDefaultPercentage = (recipient) => {
  switch (recipient) {
    case 'relson_gracie': return 56
    default: return 28
  }
}

const getFormValues = (recipient) => {
  const percentage = getDefaultPercentage(recipient)
  return {
    '1': {
      id: '1',
      serviceDate: '',
      description: 'Dominion East Ohio',
      amount: 0.00,
      percentage,
    },
    '2': {
      id: '2',
      serviceDate: '',
      description: 'Illuminating Co.',
      amount: 0.00,
      percentage,
    },
    '3': {
      id: '3',
      serviceDate: '',
      description: 'Waste Management of Ohio',
      amount: 0.00,
      percentage,
    },
    '4': {
      id: '4',
      serviceDate: '',
      description: '',
      amount: 0,
      percentage,
    },
  }
}

export default getFormValues
