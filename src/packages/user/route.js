import express from 'express'
import UserCtrl from './controller'
import { preQuery } from '../../utils/pre-query'
import auth from '../system/authorizator'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {String} Authorization Access token
 */

/**
 * @api {post} /register Register
 * @apiGroup Users
 *
 * @apiName Register
 *
 */
router.post('/register', UserCtrl.register)

/**
 * @api {get} /me Show user profile
 * @apiUse UserHeader
 * @apiGroup Users
 *
 * @apiName Me
 *
 */
router.get('/me', auth.requireLogin, UserCtrl.show)

// router.param('userId', preQuery.user)

export default router
