import { sessionLocale } from '../../locales'
import { User } from '../../models'
import config from '../../configs'
import queryBuilder from './query-builder'
import tokenGenerator from '../../utils/token-generator'

async function login(body) {
  const { email, password } = body
  const query = queryBuilder.buildLogin(email)
  let user = await User.findOne(query)
  if (user && user.authenticate(password)) {
    const tokenData = user.genTokenData()
    user = await User.commonUserData(user.toJSON())
    user.token = tokenGenerator.generate(tokenData)
    user.refreshToken = tokenGenerator.generate(tokenData, { expiresIn: config.refreshTokenLife })
    return {
      data: user
    }
  } else {
    return {
      error: sessionLocale.loginFail
    }
  }
}

export default {
  login
}
