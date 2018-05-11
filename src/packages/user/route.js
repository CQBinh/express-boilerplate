/**
 * User routes
 * prefix: /users
 */

import express from 'express'
import middleware from '../system/middleware'
import UserCtrl from './controller'
import validation from './validation'
import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {String} Authorization Access token
 */

/**
 * @api {get} /me Get user brief info
 * @apiUse UserHeader
 * @apiName User
 *
 * @apiGroup Me
 *
 */
router.get('/me', middleware.requiresLogin, UserCtrl.me)

router.param('userId', preQuery.user)

export default router
