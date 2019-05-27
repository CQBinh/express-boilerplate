import { mongoose } from '../utils/mongoose'
import config from '../configs'
import env from '../utils/env'

export default async function () {
  mongoose.set('debug', env.isDevelopment())
  try {
    const options = {
      autoIndex: !!global.isIndexesServer
    }
    await mongoose.connect(config.db, config.dbOptions(options))
  } catch (error) {
    console.log('Error on connecting to db: ', error)
    console.log('\x1b[31m', '*** PLEASE CONNECT TO DATABASE BEFORE RUN SERVER', '\x1b[0m')
    process.exit(1)
  }
}
