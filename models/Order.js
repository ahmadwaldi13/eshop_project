import db from '../config/db.js'

export default class Order {
    static async getAll() {
        try {
            const [ rows ] = await db.execute('SELECT o.id, o.total, u.name AS user_name, u.email, p.name AS product_name, p.url, od.quantity, od.price, o.created_at FROM orders AS o JOIN orders_detail AS od ON(od.id_order = o.id) JOIN products AS p ON(od.id_product = p.id) JOIN users AS u ON(o.id_user = u.id)')
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
    static async getOrderByUser(id_user) {
        try {
            const [ rows ] = await db.execute('SELECT o.id, o.total, u.name, u.email, p.name AS product_name, od.quantity, od.price, o.created_at FROM orders AS o JOIN orders_detail AS od ON(od.id_order = o.id) JOIN products AS p ON(od.id_product = p.id) JOIN users AS u ON(o.id_user = u.id) WHERE o.id_user = ?', [+id_user])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
    static async add(data) {
        const {total, id_user, id_product, quantity, price} = data

        try {
            await db.beginTransaction()
            const [rows] = await db.execute('INSERT INTO orders (total, id_user) VALUES (?, ?)', [+total, +id_user])
            const [ dataOrders ] = await db.execute('SELECT * FROM orders')     
        
            const newOrder = dataOrders[dataOrders.length - 1]
            let { id } = newOrder
            const id_order = id

            await db.execute('INSERT INTO orders_detail(id_product, id_order, quantity, price) VALUES (?, ?, ?, ?)', [+id_product, +id_order, +quantity, +price])
            await db.commit()   

            return rows
            
        } catch (error) {
            await db.rollback()
            console.info(error.message)
        }
    }
    static async remove(id) {
        try {
            const [ rows ] = await db.execute('DELETE FROM orders WHERE id = ?', [+id])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
    static async update(id, newData) {
        const { total, id_user } = newData
        try {
            const [ rows ] = await db.execute('UPDATE orders SET total = ?, id_user = ? WHERE id = ?', [total, id_user, +id])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
} 