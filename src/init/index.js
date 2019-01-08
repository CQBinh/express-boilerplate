import connectDb from './db'

export default async () => {
  require('./misc')
  global.valueAll = 'all'
  await connectDb()
  require('../logger')
  require('../models')
  require('../schedules')
}
