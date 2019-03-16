import express from 'express'
import { preQuery } from '../../utils'
import auth from '../system/middleware'
import paramValidation from '../validator'
import SampleCtrl from './controller'

const router = express.Router()

/**
 * @apiDefine CommonSampleAPI
 * @apiHeader {String} Authorization Business access token
 */

/**
 * @api {post} /brands Create brand
 * @apiUse CommonSampleAPI
 *
 * @apiGroup Samples
 * @apiName Create
 *
 * @apiParam {String} name
 * @apiParam {String} [desc]
 * @apiParam {String} [logo]
 */
router.post('/', paramValidation.brand.validateCreateSample, auth.requiresBusiness, SampleCtrl.create)

/**
 * @api {get} /brands Get business's brands
 * @apiUse CommonSampleAPI
 *
 * @apiGroup Samples
 * @apiName ListSamples
 *
 * @apiParam {Number} [page]
 */
router.get('/', paramValidation.brand.validateListSamples, auth.requiresBusiness, SampleCtrl.index)

/**
 * @api {get} /brands/:id Show brand
 * @apiUse CommonSampleAPI
 *
 * @apiGroup Samples
 * @apiName Show
 *
 */
router.get('/:id', auth.requiresBusiness, SampleCtrl.show)

/**
 * @api {put} /brands/:id Update brand
 * @apiUse CommonSampleAPI
 *
 * @apiGroup Samples
 * @apiName Update
 *
 * @apiParam {String} [name]
 * @apiParam {String} [desc]
 * @apiParam {String} [logo]
 */
router.put('/:id', paramValidation.brand.validateUpdateSample, auth.requiresSampleInBusiness, SampleCtrl.update)

/**
 * @api {patch} /brands/:id Change status
 * @apiUse CommonSampleAPI
 *
 * @apiGroup Samples
 * @apiName ChangeStatus
 *
 */
router.patch('/:id', auth.requiresSampleInBusiness, SampleCtrl.changeStatus)

/**
 * @api {delete} /brands Delete brand
 * @apiUse CommonSampleAPI
 *
 * @apiGroup Samples
 * @apiName Delete
 *
 * @apiParam {Array} ids the list of invoice's id
 */
router.delete('/', paramValidation.product.validateDeleteMulti, auth.requiresSamplesInBusiness, SampleCtrl.destroy)

router.param('id', preQuery.brand)

export default router
