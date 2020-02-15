
export const getEmailAddrByRecipientId = (id: number): string => {
  const map: Record<number, string> = {
    0: "winfieldlee01@gmail.com",
    1: "winfieldlee01@gmail.com",
    2: "winfieldlee01@gmail.com",
  }

  return map[id]
}