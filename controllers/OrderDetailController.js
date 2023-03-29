import OrderDetail from '../models/OrderDetail.js'

export default class OrderDetailController {
    static getAll = async (req, res) => {
        try {
            const results = await OrderDetail.getAll()
            if(results.length === 0) {
                res.status(404).json({
                    msg: 'Orders Detail Not Found'
                })
            }else {
                res.status(200).json(results)
            }
        } catch (error) {
            console.info(error.message)
        }
    }
    static getOrderDetailById = async (req, res) => {
        const id = req.params.id

        try {
            const result = await OrderDetail.getOrderDetailById(id)
            if(result.length === 0) {
                res.status(404).json({
                    msg: 'Order Detail Not Found'
                })
            }else {
                res.status(200).json(result)
            }
        } catch (error) {
            console.info(error.message)
        }
    }
    static add = async (req, res) => {
        const data = req.body

        try {
            const response = await OrderDetail.add(data)
            const { affectedRows } = response
            if(affectedRows > 0) {
                res.status(201).json({
                    msg: 'Order detail added successfully'
                })
            }else {
                res.status(400).json({
                    msg: 'Failed to add order detail'
                })
            }
        } catch (error) {
            console.info(error.message)
        }
    }
    static remove = async (req, res) => {
        const id = req.params.id

        try {
            const result = await OrderDetail.getOrderDetailById(id)

            if(result.length === 0) {
                res.status(404).json({
                    msg: 'Order detail not found'
                })
            }else {
                const response = await OrderDetail.remove(id)
                const { affectedRows } = response

                if(affectedRows > 0) {
                    res.status(200).json({
                        msg: 'Order detail removed successfully'
                    })
                }else {
                    res.status(400).json({
                        msg: 'Failed to remove order detail'
                    })
                }
            }
            
        } catch (error) {
            console.info(error.message)
        }
    }
    static update = async (req, res) => {
        const id = req.params.id
        const newData = req.body

        try {
            const response = await OrderDetail.update(id, newData)
            const { affectedRows } = response
            
            if(affectedRows > 0) {
                res.status(200).json({
                    msg: 'Order detail updated successfully'
                })
            }else {
                res.status(400).json({
                    msg: 'Failed to update order detail'
                })
            }
        } catch (error) {
            console.info(error.message)
        }
    }
}