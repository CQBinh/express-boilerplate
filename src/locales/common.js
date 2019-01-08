import { commonCode } from './response-code'

export default {
  tokenVerifyFailed: {
    code: commonCode.tokenVerifyFailed,
    message: 'Authentication failed. Please login again'
  },
  noToken: {
    message: 'Authentication info not found'
  },
  apiNotFound: {
    code: commonCode.apiNotFound,
    message: 'API not found'
  },
  serverError: {
    code: commonCode.serverError,
    message: 'Server error'
  },
  dataAlreadyExisted: {
    code: commonCode.dataAlreadyExisted,
    message: 'Data is already existed'
  }
}
