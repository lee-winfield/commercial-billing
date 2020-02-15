
export const getEmailAddrByRecipientId = (id: number): string => {
  const map: Record<number, string> = {
    0: "cjwinfield4@gmail.com",
    1: "ronaderhold@gmail.com",
    2: "info@championmover.com",
  }

  return map[id]
}