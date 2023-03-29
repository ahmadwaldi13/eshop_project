import express from 'express'
import routerUser from './routerUser.js'
import routerProduct from './routerProduct.js'
import routerOrder from './routerOrder.js'
import routerOrderDetail from './routerOrderDetail.js'

const router = express.Router()

router.use('/users', routerUser)
router.use('/products', routerProduct)
router.use('/orders', routerOrder)
router.use('/orders_detail', routerOrderDetail)



export default router