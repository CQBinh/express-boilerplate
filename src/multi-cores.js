import http from 'http'
import env from './utils/env'
import { mongoose } from './utils/mongoose'

export default (app, mediator) => {
  validatePort()
  const server = http.createServer(app).listen(env.PORT)

  if (env.LOCAL_MODE === 'true') {
    console.log('Running on local server')
    global.isCronJobServer = true
    global.isIndexesServer = true
    setImmediate(() => {
      mediator.emit('boot.ready')
    })

    server.on('error', onError)
    handleSigInt(server)
    handleMessages()
    return
  }

  console.log(`Worker ${env.NODE_APP_INSTANCE} started with process id: ${process.pid}`)

  if (process.env.NODE_APP_INSTANCE === '0') {
    console.log('*************************************************')
    console.log(`*** THIS IS A CRONJOB SERVER WITH WORKER ID ${env.NODE_APP_INSTANCE} ***`)
    console.log('*************************************************')
    global.isCronJobServer = true
    global.isIndexesServer = true
  }
  setImmediate(() => {
    mediator.emit('boot.ready')
  })

  server.on('error', onError)
  handleSigInt(server)
  handleMessages()
}

function validatePort() {
  if (!env.PORT) {
    console.log('\x1b[31m', '*** PLEASE SET PORT in .env file', '\x1b[0m')
    throw new Error('\x1b[31m', '*** PLEASE SET PORT in .env file')
    process.exit(1)
  }
}

function handleSigInt(server) {
  process.on('SIGINT', () => {
    console.info('SIGINT signal received.')

    server.close((err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
    mongoose.connection.close(() => {
      console.log('Mongoose connection disconnected')
      process.exit(0)
    })
  })
}

function handleMessages() {
  process.on('message', (msg) => {
    if (msg === 'shutdown') {
      console.log('Closing all connections...')
      setTimeout(() => {
        console.log('Finished closing connections')
        process.exit(0)
      }, 1500)
    }
  })
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Pipe ${env.PORT} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`Port ${env.PORT} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}
