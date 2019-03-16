import { Router } from 'express'
import sessionRoute from './packages/session/route'
import userRoute from './packages/user/route'
import authenticator from './packages/system/authenticator'

export default () => {
  const api = Router()

  api.use('*', authenticator)

  api.use('/sessions', sessionRoute)
  api.use('/users', userRoute)

  return api
}
