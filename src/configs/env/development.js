export default {
  // Db
  db: 'mongodb://localhost/zodyapp-dev',
  dbOptions: {
    native_parser: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000
  },

  // Secret for token
  secret: '8?@B##o!fV}5R8G',

  // Define S3
  S3: {
    // host: 'https://zodyapp-dev.s3.amazonaws.com/',
    // bucket: 'zodyapp-dev'
    host: 'https://cdn.zody.vn/',
    bucket: 'zodyapp'
  },

  // Mailer
  mailer: {
    from: 'Zody Dev <dev@zody.vn>',
    report: 'Zody Dev',
    pool: true,
    transportMethod: 'SMTP',
    service: 'Gmail',
    auth: {
      user: 'shinaekwon2n@gmail.com',
      pass: '646341aZ?QP'
    }
  }
}
