import winston from 'winston'

if (process.env.NODE_ENV === 'production') {
  require('winston-loggly-bulk')

  winston.add(winston.transports.Loggly, {
    token: '682967b9-156c-4d98-b3c3-03e1ea8e47c3',
    subdomain: 'huynhnam',
    tags: ['Zody-App'],
    json: true
  })
}

export default winston
