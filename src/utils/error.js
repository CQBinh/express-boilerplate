import { commonLocale } from '../locales'
import logger from '../logger'

/**
 * Get message from error object
 *
 * @param {Object}  error
 */
const message = (error) => {
  if (!error) {
    return commonLocale.serverError
  }

  let code = ''
  if (error.name === 'MongoError') {
    if (error.code === 11000) {
      code = commonLocale.dataAlreadyExisted
    } else {
      // code = commonLocale.serverError
      code = error.message
    }
  } else if (error.errors) {
    code = error.errors[Object.keys(error.errors)[0]] ? error.errors[Object.keys(error.errors)[0]].message : commonLocale.serverError
  } else {
    code = -1
  }

  logger.error(code, { error })

  return code
}

/**
 * Get last error from error object
 *
 * @param {Object}  errors
 */
const last = (errors) => {
  const keys = Object.keys(errors)
  return errors[keys[keys.length - 1]]
}

/**
 * Get error from promise (using "to" function)
 *
 * @param {Object} error
 */
const fromPromise = ({ error }) => {
  if (error) {
    return message(error)
  }
  return ''
}

export default {
  message,
  last,
  fromPromise
}
