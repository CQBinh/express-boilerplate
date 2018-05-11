export default {
  // Db
  db: 'mongodb://localhost/zodyapp-test',
  dbOptions: {
    useMongoClient: true,
    native_parser: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000
  },

  // Port
  port: 5011,

  // Secret for user token
  secret: 'DC2da?q!45#{fc}65|d(!5',

  // Define S3
  S3: {
    host: 'https://zodyapp-dev.s3.amazonaws.com/',
    bucket: 'zodyapp-dev'
  },

  // Mailer
  mailer: {
    from: 'Zody Dev <dev@zody.vn>',
    report: 'Zody Dev',
    transportMethod: 'SMTP',
    service: 'Gmail',
    auth: {
      user: '',
      pass: ''
    }
  }
}
