export default {
  // Db
  db: 'mongodb://localhost/express-dev',
  dbOptions: {
    native_parser: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000
  },

  // Secret for token
  secret: '8?@B##o!fV}5R8G',
}
