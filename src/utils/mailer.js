import mailer, { collectMailerMessages } from '../modules/mailer/balance-sheet'

/**
 * Send balance sheet email
 *
 * @param  {Array}   data
 */
const sendBalanceSheet = async (data = [], user) => {
  const messages = await collectMailerMessages(data)

  if (messages.error) {
    return messages
  }

  await mailer(messages.data, user)
  return []
}

export default {
  sendBalanceSheet
}
