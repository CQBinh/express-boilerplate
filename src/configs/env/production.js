import env from '../../utils/env'

export default {
  db: 'mongodb://localhost/express',
  dbOptions: (options) => {
    return {
      useCreateIndex: true,
      autoIndex: options.autoIndex,
      autoReconnect: true,
      useNewUrlParser: true,
      keepAlive: 1,
      connectTimeoutMS: 300000,
      socketTimeoutMS: 300000
    }
  },
  secret: env.SECRET,
  email: {
    id: 'binh-prod@gmail.com',
    pass: env.EMAIL_PASS
  }
}
