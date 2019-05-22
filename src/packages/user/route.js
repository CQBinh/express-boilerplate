import express from 'express'
import UserCtrl from './controller'
import preQuery from '../../utils/pre-query'
import auth from '../system/authorizator'
import paramValidator from '../validator'

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
 * @apiParam {String} email
 * @apiParam {String} password must be in md5 format
 */
router.post('/register', paramValidator.user.validateRegister, UserCtrl.register)

/**
 * @api {get} /me Show user profile
 * @apiUse Header
 * @apiGroup Users
 *
 * @apiName Me
 *
 */
router.get('/me', auth.requireLogin, UserCtrl.show)

router.param('id', preQuery.user)

export default router
