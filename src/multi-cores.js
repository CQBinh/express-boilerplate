// import { exec } from 'child_process'
import http from 'http'
import net from 'net'
import cluster from 'cluster'
import os from 'os'
import farmhash from 'farmhash'
import { env } from './utils'

const NUMCPUS = os.cpus().length
const debug = require('debug')('App')

global.cronjobServerId = -1

export default (app, mediator) => {
  // Set port
  app.set('port', process.env.PORT || '5020')

  // Create HTTP server
  let server = http.createServer(app)

  if (!env.isProduction()) {
    server.listen(app.get('port'))

    // require('./socketio')(server)

    global.isIndexesServer = true

    // Emit to connect db
    setImmediate(() => {
      mediator.emit('boot.ready')
    })

    debug(`Server started on port ${app.get('port')}`)
    return
  }

  // Set cluster
  if (cluster.isMaster) {
    debug(`Listening on ${app.get('port')}`)
    const workers = []

    // Helper function, spawn worker when it died
    const spawn = (i) => {
      workers[i] = cluster.fork()
      if (global.cronjobServerId === -1) {
        global.cronjobServerId = i
        workers[i].send({ isCronJobServer: true })
      }

      // Optional: Restart worker on exit
      workers[i].on('exit', () => {
        if (i === global.cronjobServerId) {
          global.cronjobServerId = -1
        }
        debug(`worker pid ${workers[i] && workers[i].process ? workers[i].process.pid : 'UNDEFINED'} died, restarting...`)
        spawn(i)
      })
    }

    // Spawn workers.
    for (let i = 0; i < NUMCPUS; i += 1) {
      spawn(i)
    }

    // Helper function, get worker index base on ip
    const workerIndex = (ip, len) => {
      return farmhash.fingerprint32(ip) % len
    }

    // Create the outside facing server listening on our port.
    server = net.createServer({
      pauseOnConnect: true
    }, (connection) => {
      // const worker = workers[workerIndex(connection.remoteAddress, NUMCPUS)]
      const worker = workers[workerIndex('125.212.219.216', NUMCPUS)]
      worker.send('sticky-session:connection', connection)
    }).listen(app.get('port'))
  } else {
    server = app.listen(0, () => {
      // Socket io
      // require('./socketio')(server)
      process.send('ready')
    })

    // Listen to messages sent from the master. Ignore everything else.
    process.on('message', (message, connection) => {
      if (message.isCronJobServer) {
        global.isIndexesServer = true
      }

      // Emit to connect db
      setImmediate(() => {
        mediator.emit('boot.ready')
      })

      // Handle cronjob server
      if (message.isCronJobServer) {
        console.log('********************************************************************')
        console.log(`*** THIS IS A CRONJOB SERVER WITH WORKER ID ${cluster.worker.id} ***`)
        console.log('********************************************************************')
        global.isCronJobServer = true
      }

      if (message !== 'sticky-session:connection') {
        return
      }

      // Emulate a connection event on the server by emitting the
      // event with the connection the master sent us.
      server.emit('connection', connection)

      connection.resume()
    })
  }

  /**
   * Event listener for HTTP server "error" event.
   */
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
        // console.error(`${bind} is already in use, run shell script`)
        // exec('sh ~/cmd/kill-5020.sh', (err) => {
        //   if (err) {
        //     console.log('Run shell script: Error', err)
        //     return
        //   }

        //   console.log('Run shell script: OK')
        // })
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
