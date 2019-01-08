import { commonLocale } from '../locales'
import logger from '../logger'

function parseError(error) {
  let message = ''
  let code
  if (error.name === 'MongoError') {
    if (error.code === 11000) {
      code = error.code
      message = commonLocale.dataAlreadyExisted
    } else {
      code = commonLocale.serverError
      message = error.message
    }
  } else if (error.errors) {
    const keys = Object.keys(error.errors)
    message = error.errors[keys[0]] ? error.errors[keys[0]].message : commonLocale.serverError
  } else {
    message = error.message
    code = error.code
  }

  logger.error(message, { error })

  return {
    success: false,
    message,
    code
  }
}

export default {
  parseError
}
