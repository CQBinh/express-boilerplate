export default {
  // Db
  db: 'mongodb://localhost/zodyapp',
  dbOptions: {
    autoReconnect: true,
    keepAlive: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
  },

  // Define S3
  S3: {
    // host: 'https://zodyapp.s3.amazonaws.com/',
    host: 'https://cdn.zody.vn/',
    bucket: 'zodyapp'
  },

  // Secret for user token
  secret: process.env.USER_TOKEN_SECRET,

  // Mailer
  mailer: {
    from: process.env.MAILER_FROM,
    report: process.env.MAILER_REPORT,
    pool: true,
    transportMethod: 'SMTP',
    service: 'Gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD
    }
  }
}
