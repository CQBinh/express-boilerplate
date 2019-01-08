import { User } from '../../models'
import tokenGenerator from '../../utils/token-generator'
import config from '../../configs'

async function signupUser(body) {
  let user = await User.create(body)
  const tokenData = user.genTokenData()
  user = await User.commonUserData(user.toJSON())
  user.token = tokenGenerator.generate(tokenData)
  user.refreshToken = tokenGenerator.generate(tokenData, { expiresIn: config.refreshTokenLife })
  return user
}

export default {
  signupUser
}
