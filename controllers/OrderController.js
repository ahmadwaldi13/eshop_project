import Order from '../models/Order.js'

export default class OrderController {
    static getAll = async (req, res) =>{
        try {
            const results = await Order.getAll()
            if(results.length === 0) {
                res.status(200).json({
                    msg: 'Orders is empty'
                })
            }else {
                if(results) {
                    res.status(200).json(results)
                }
            }
        } catch (error) {
            console.info(error.message)
        }
    }
    static getOrderByUser = async (req, res) =>{
        const id_user = req.params.id_user

        try {
            const result = await Order.getOrderByUser(id_user)
            if(result.length === 0) {
                res.status(404).json({
                    msg: 'Order not found'
                })
            }else {
                res.status(200).json(result)
            }
        } catch (error) {
            
        }
    }
    static add = async (req, res) =>{
        const data = req.body

        try {
            const response = await Order.add(data)
            const { affectedRows } = response
            if(affectedRows > 0) {
                res.status(201).json({
                    msg: 'Order added successfully'
                })
            }else {
                res.status(400).json({
                    msg: 'Failed to enter data order'
                })
            }
        } catch (error) {
            console.info(error.message)
        }

    }
    static remove = async (req, res) =>{
        const id = req.params.id

        try {
            const response = await Order.remove(id)
                const { affectedRows } = response
                if(affectedRows > 0) {
                    res.status(200).json({
                        msg: 'Order removed successfully'
                    })
                }else {
                    res.status(400).json({
                        msg: 'Failed to remove order'
                    })
                }
            // const result = await Order.getOrderByUser(id)
            // if(result.length === 0) {
            //     res.status(404).json({
            //         msg: 'Order not found'
            //     })
            // }else {
                
            // }
        } catch (error) {
            console.info(error.message)
        }
    }
    static update = async (req, res) =>{
        const id_user = req.params.id_user
        const newData = req.body

        try {
            const result = await Order.getOrderByUser(id_user)
            if(result.length === 0) return res.status(404).json({
                msg: 'Order not found'
            })

            const response = await Order.update(id_user, newData)
            const { affectedRows } = response
            if(affectedRows > 0) {
                res.status(200).json({
                    msg: 'Order updated successfully'
                })
            }else {
                res.status(400).json({
                    msg: 'Failed to update order'
                })
            }
        } catch (error) {
            console.info(error.message)
        }
    }
}