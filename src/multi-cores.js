import http from 'http'
import net from 'net'
import cluster from 'cluster'
import os from 'os'
import farmhash from 'farmhash'
import env from './utils/env'

const NUMCPUS = os.cpus().length
const debug = require('debug')('App')

export default (app, mediator) => {
  app.set('port', env.PORT || '5000')

  let server = http.createServer(app)

  if (!env.isProduction()) {
    server.listen(app.get('port'))

    setImmediate(() => {
      mediator.emit('boot.ready')
    })
    global.isCronJobServer = true
    debug(`Server started on port ${app.get('port')}`)
    return
  }

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    debug(`Listening on ${app.get('port')}`)
    const workers = []

    const spawn = (i) => {
      workers[i] = cluster.fork()
      if (i === 0) {
        workers[i].send({ isCronJobServer: true })
      }
      workers[i].on('exit', () => {
        debug(`worker pid ${workers[i] && workers[i].process ? workers[i].process.pid : 'UNDEFINED'} died, restarting...`)
        spawn(i)
      })
    }

    for (let i = 0; i < NUMCPUS; i += 1) {
      spawn(i)
    }

    const workerIndex = (ip, len) => {
      console.log('requester ip', ip)
      return farmhash.fingerprint32(ip) % len
    }

    // Create the outside facing server listening on our port.
    server = net.createServer({ pauseOnConnect: true }, (connection) => {
      const worker = workers[workerIndex(connection.remoteAddress, NUMCPUS)]
      worker.send('sticky-session:connection', connection)
    }).listen(app.get('port'))
  } else {
    console.log(`Worker ${process.pid} started`)
    server = app.listen(0, () => {
      // Socket io
      // require('./socketio')(server)
      process.send('ready')
    })


    // Listen to messages sent from the master. Ignore everything else.
    process.on('message', (message, connection) => {
      console.log('on message', message)
      if (message.isCronJobServer) {
        console.log('********************************************************************')
        console.log(`*** THIS IS A CRONJOB SERVER WITH WORKER ID ${cluster.worker.id} ***`)
        console.log('********************************************************************')
        global.isCronJobServer = true
        global.isIndexesServer = true
      }
      setImmediate(() => {
        mediator.emit('boot.ready')
      })

      if (message !== 'sticky-session:connection') {
        return
      }
      server.emit('connection', connection)

      connection.resume()
    })
  }

  const onError = (error) => {
    console.log('onError', error)
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string' ? `Pipe ${app.get('port')}` : `Port ${app.get('port')}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`)
        process.exit(1)
        break
      default:
        throw error
    }
  }

  server.on('error', onError)
  server.on('close', () => {
    console.log('SERVER CLOSED')
  })
}
