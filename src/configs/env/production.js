export default {
  // Db
  db: 'mongodb://localhost/express',
  dbOptions: {
    autoReconnect: true,
    keepAlive: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
  },
}
