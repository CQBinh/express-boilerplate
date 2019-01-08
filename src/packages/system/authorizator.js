import { commonLocale } from '../../locales/index'
import ResponseBuilder from '../../utils/response-builder'
import cipher from '../../utils/cipher'

const BAD_REQUEST_CODE = 400
const UN_AUTHORIZED_CODE = 401
const DUPLICATE_CODE = 409
const SERVER_ERROR_CODE = 500


function isAuthenticated(user) {
  return (user && user._id)
}


const requireLogin = async (req, res, next) => {
  const isAuthorized = await isAuthenticated(req.user)
  if (!isAuthorized) {
    return res.status(UN_AUTHORIZED_CODE).jsonp(ResponseBuilder.build(false, {}))
  }
  next()
}

async function checkPasswordFormat(req, res, next) {
  const { password } = req.body
  if (!password || !cipher.isMd5Hash(password)) {
    return res.status(BAD_REQUEST_CODE).jsonp(ResponseBuilder.build(false, {}, {
      message: commonLocale.passwordInvalidFormat
    }))
  }
  next()
}

export default {
  checkPasswordFormat,
  requireLogin
}

export {
  BAD_REQUEST_CODE,
  UN_AUTHORIZED_CODE,
  DUPLICATE_CODE,
  SERVER_ERROR_CODE
}
