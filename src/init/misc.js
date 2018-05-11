/**
 * Init some data when server start
 */
import { parallel } from 'async'
import moment from 'moment'

const METHODS = ['log', 'warn']

parallel({
  log: (cb) => {
    METHODS.forEach((method) => {
      const old = console[method]
      console[method] = function (...args) {
        let stack = (new Error()).stack.split(/\n/)
        if (stack[0].indexOf('Error') === 0) {
          stack = stack.slice(1)
        }
        const localArgs = [].slice.apply(args).concat(`${[stack[1].trim()]} - ${moment().format('DD/MM/YYYY, HH:mm:ss')}`)
        return old.apply(console, localArgs)
      }
    })
    cb()
  }
})
