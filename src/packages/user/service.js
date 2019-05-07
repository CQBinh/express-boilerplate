import { User } from '../../models'
import tokenGenerator from '../../utils/token-generator'
import config from '../../configs'
import repo from './repository'

async function signupUser(body) {
  let user = await repo.createUser(body)
  const tokenData = user.genTokenData()
  user = await User.commonUserData(user.toJSON())
  user.token = tokenGenerator.generate(tokenData)
  user.refreshToken = tokenGenerator.generate(tokenData, { expiresIn: config.refreshTokenLife })
  return user
}

export default {
  signupUser
}
