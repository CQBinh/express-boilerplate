import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import methodOverride from 'method-override'
import compress from 'compression'
import helmet from 'helmet'
import { EventEmitter } from 'events'
import multiCores from './multi-cores'
import { commonLocale } from './locales'
import init from './init'
import route from './routes'
import responseBuilder from './utils/response-builder'
import logger from './logger'
import errorUtil from './utils/error'

const mediator = new EventEmitter()
const app = express()

// 3rd party middleware
app.use(morgan('dev'))
app.use(cors())
app.use(compress())
app.use(methodOverride())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

// set multi cores
multiCores(app, mediator)

mediator.once('boot.ready', () => {
  console.log('SERVER BOOT READY')
  init(app)

  app.use(route())

  // catch 404 and forward to error handler
  app.use((req, res) => {
    console.log('404', req.url)
    logger.info({
      data: {
        url: `404 - ${req.method.toUpperCase()} ${req.url}`,
        clientData: ['get', 'delete'].includes(req.method.toLowerCase()) ? req.query : req.body
      }
    })
    return res.status(404).jsonp(responseBuilder.build(false, {}, errorUtil.parseError(commonLocale.apiNotFound)))
  })

  // error handler
  app.use((error, req, res) => {
    console.log('500', error)
    logger.info({
      data: {
        url: `500 - ${req.method.toUpperCase()} ${req.url}`,
        clientData: ['get', 'delete'].includes(req.method.toLowerCase()) ? req.query : req.body
      }
    })
    return res.status(500).jsonp(responseBuilder.build(false, {}, errorUtil.parseError(commonLocale.serverError)))
  })
})

// const { PORT = 5020 } = process.env
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

export default app
