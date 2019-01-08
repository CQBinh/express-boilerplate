import { userCode } from './response-code'

export default {
  invalidEmailFormat: {
    code: userCode.invalidEmailFormatCode,
    message: 'Email invalid'
  },
  notFound: {
    code: userCode.notFound,
    message: 'User not found'
  },
  userExisted: {
    code: userCode.userExisted,
    message: 'User existed'
  }
}
