const getRecipients = () => [
  {
    name: 'C.J. Winfield Properties',
    id: 0,
    defaultPercentage: 22,
    included: true,
    address1: "4679 Hamann Parkway",
    address2: "Willoughby, OH 44094",
    phone: "440-725-5544",
    allocations: [
      {
        sourceId: 0,
        allocated: true,
        percentage: 22,
      },
      {
        sourceId: 1,
        allocated: true,
        percentage: 22,
      },
      {
        sourceId: 2,
        allocated: true,
        percentage: 22,
      },
    ],
  },
  {
    name: 'Relson Gracie Jiu Jitsu',
    id: 1,
    defaultPercentage: 56,
    included: true,
    address1: "4679 Hamann Parkway",
    address2: "Willoughby, OH 44094",
    phone: "440-942-7179",
    allocations: [
      {
        sourceId: 0,
        allocated: true,
        percentage: 56,
      },
      {
        sourceId: 1,
        allocated: true,
        percentage: 56,
      },
      {
        sourceId: 2,
        allocated: true,
        percentage: 56,
      },
    ],
  },
]

export default getRecipients
