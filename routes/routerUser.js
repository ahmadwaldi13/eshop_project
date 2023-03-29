import express from 'express'
import UserController from '../controllers/UserController.js'

const routerUser = express.Router()

routerUser.get('/', UserController.getAll)
routerUser.get('/:id', UserController.getUserById)
routerUser.post('/add', UserController.add)
routerUser.delete('/remove/:id', UserController.remove)
routerUser.patch('/update/:id', UserController.update)


export default routerUser


