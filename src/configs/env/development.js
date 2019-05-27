export default {
  db: 'mongodb://localhost/express-dev',
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
  // Secret for token
  secret: '8?@B##o!fV}5R8G',
  email: {
    id: 'binh-dev@gmail.com',
    pass: 'kdjhfkdshf3478384'
  }
}
