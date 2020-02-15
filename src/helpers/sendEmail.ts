import axios from 'axios'

export const sendEmail = async (fileName: string, recipient: string, subject: string) => {
  const url = "https://1pks1bu0k9.execute-api.us-east-2.amazonaws.com/default/emails"
  const body = {
    Body: JSON.stringify({ fileName, recipient, subject }),
  }
  await axios.post(url, body)
}