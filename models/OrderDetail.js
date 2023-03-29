import db from '../config/db.js'

export default class OrderDetail {
    static async getAll() {
        const [ rows ] = await db.execute('SELECT * FROM orders_detail')
        return rows
    }
    static async getOrderDetailById(id) {
        try {
            const [ rows ] = await db.execute('SELECT * FROM orders_detail WHERE id = ?', [+id])
            return rows
        } catch (error) {
            
        }
    }
    static async add(data) {
        const { id_product, id_order, quantity, price } = data

        try {
            const [ rows ] = await db.execute('INSERT INTO orders_detail (id_product, id_order, quantity, price) VALUES (?, ?, ?, ?)', [ +id_product, +id_order, +quantity, +price])
            return rows
        }catch(error) {
            console.info(error.message)
        }
    }
    static async remove(id) {
        try {
            const [ rows ] = await db.execute('DELETE FROM orders_detail WHERE id = ?', [+id])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
    static async update(id, newData) {
        const { quantity, price } = newData

        try {
            const [ rows ] = await db.execute('UPDATE orders_detail AS od JOIN orders AS o ON(od.id_order = o.id)SET od.quantity = ?, od.price = ?, o.total = ? WHERE od.id = ?', [+quantity, +price, +price, +id])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
}