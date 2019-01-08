import express from 'express'
import SessionCtrl from './controller'
import paramValidator from '../../utils/request-validator'
import authorizator from '../system/authorizator'

const router = express.Router()

/**
 * @api {post} /sessions Login
 * @apiGroup Sessions
 * @apiName Login
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email
 * @apiParam {String} password must be in MD5 format
 */
router.post('/', paramValidator.session.validateLogin, authorizator.checkPasswordFormat, SessionCtrl.create)

export default router
