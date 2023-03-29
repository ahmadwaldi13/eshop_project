import express from 'express'
import OrderController from '../controllers/OrderController.js'


const routerOrder = express.Router()

routerOrder.get('/', OrderController.getAll)
routerOrder.get('/:id_user', OrderController.getOrderByUser)
routerOrder.post('/', OrderController.add)
routerOrder.delete('/remove/:id', OrderController.remove)
routerOrder.put('/update/:id', OrderController.update)


export default routerOrder