import { Router } from 'express'

export default () => {
  const api = Router()

  // Authenticate with token
  api.use('*', require('./packages/system/authentication').default)

  // Mount components
  api.use('/users', require('./packages/user/route').default)

  return api
}
