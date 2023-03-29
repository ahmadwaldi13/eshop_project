import express from 'express'
import ProductController from '../controllers/ProductController.js'

const routerProduct = express.Router()

routerProduct.get('/', ProductController.getAll)
routerProduct.get('/:id', ProductController.getProductById)
routerProduct.post('/', ProductController.add)
routerProduct.delete('/remove/:id', ProductController.remove)
routerProduct.put('/update/:id', ProductController.update)


export default routerProduct