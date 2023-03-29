import express from 'express'
import OrderDetailController from '../controllers/OrderDetailController.js'


const routerOrderDetail = express.Router()

routerOrderDetail.get('/', OrderDetailController.getAll)
routerOrderDetail.get('/:id', OrderDetailController.getOrderDetailById)
routerOrderDetail.post('/', OrderDetailController.add)
routerOrderDetail.delete('/remove/:id', OrderDetailController.remove)
routerOrderDetail.put('/update/:id', OrderDetailController.update)


export default routerOrderDetail