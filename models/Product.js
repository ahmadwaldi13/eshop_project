import db from '../config/db.js'

export default class Product {
    static async getAll() {
        try {
            const [ rows ] = await db.execute('SELECT p.id, p.name, p.images, p.url, p.detail, p.quantity, p.price, c.name AS category FROM products AS p JOIN categories AS c ON(p.id_category = c.id)')
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
    static async getProductById(id) {
        try {
            const [ rows ] = await db.execute('SELECT p.id, p.name, p.images, p.url, p.detail, p.quantity, p.price, c.name AS category FROM products AS p JOIN categories AS c ON(p.id_category = c.id) WHERE p.id = ?', [+id])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
    static async add(data, imageName, url) {
        const { name, detail, quantity, price, id_category } = data
        
        try {
            const [ rows ] = await db.execute('INSERT INTO products (name, images, url, detail, quantity, price, id_category) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, imageName, url, detail, +quantity, +price, +id_category])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
    static async remove(id) {
        try {
            const [ rows ] = await db.execute('DELETE FROM products WHERE id = ?', [id])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
    static async update(id, newData, images, url) {
        const { name, detail, quantity, price, id_category } = newData
        try {
            const [rows] = await db.execute('UPDATE products SET name = ?, images = ?, url = ?, detail = ?, quantity = ?, price = ?, id_category = ? WHERE id = ?', [name, images, url, detail, +quantity, +price, +id_category, +id])
            return rows
        } catch (error) {
            console.info(error.message)
        }
    }
}