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
        percentage: 44,
      },
      {
        sourceId: 1,
        allocated: true,
        percentage: 44,
      },
      {
        sourceId: 2,
        allocated: true,
        percentage: 44,
      },
      {
        sourceId: 3,
        allocated: false,
        percentage: 0,
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
      {
        sourceId: 3,
        allocated: false,
        percentage: 0,
      },
    ],
  },
  {
    name: 'Champion Moving LLC',
    id: 2,
    defaultPercentage: 0,
    included: true,
    address1: "4679 Hamann Parkway",
    address2: "Willoughby, OH 44094",
    phone: "440-279-3465",
    allocations: [
      {
        sourceId: 0,
        allocated: false,
        percentage: 0,
      },
      {
        sourceId: 1,
        allocated: false,
        percentage: 0,
      },
      {
        sourceId: 2,
        allocated: false,
        percentage: 0,
      },
      {
        sourceId: 3,
        allocated: true,
        percentage: 100,
      },
    ],
  },
]

export default getRecipients
