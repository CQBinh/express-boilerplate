import { User } from '../../models'
import { userLocale } from '../../locales'
import service from './service'
import responseBuilder from '../../utils/response-builder'
import errorUtil from '../../utils/error'
import to from '../../utils/to'

async function show(req, res) {
  const [error, user] = await to(User.commonUserData(req.user))
  if (error) {
    return res.jsonp(responseBuilder.build(false, {}, errorUtil.parseError(error)))
  }
  res.jsonp(responseBuilder.build(true, { user }))
}


async function register(req, res) {
  const [error, user] = await to(service.signupUser(req.body))
  if (error) {
    if (error.code === 11000) {
      return res.jsonp(responseBuilder.build(false, {}, errorUtil.parseError(userLocale.userExisted)))
    }
    return res.jsonp(responseBuilder.build(false, {}, errorUtil.parseError(error)))
  }
  res.jsonp(responseBuilder.build(true, { user }))
}

export default {
  show,
  register,
}
