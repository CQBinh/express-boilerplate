const commonCode = {
  serverError: 1000,
  apiNotFound: 1001,
  tokenVerifyFailed: 1002,
  dataAlreadyExisted: 1003
}

const userCode = {
  invalidEmailFormatCode: 1050,
  invalidPhoneFormatCode: 1051,
  notFoundOrInactiveCode: 1052,
  userExisted: 1053,
  invalidOldPasswordCode: 1054,
  invalidNewPasswordCode: 1055,
  notFound: 1056
}

const sessionCode = {
  loginFail: 2001
}

export {
  commonCode,
  sessionCode,
  userCode
}
