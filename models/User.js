import db from '../config/db.js'


export default class User {
    static async getAll() {
        try {
            const [ rows ] = await db.execute('SELECT id, username, profile_image, email, name FROM users')
            return rows
        } catch (error) {
            console.info(error)
        }
    }
    static async getUserById(id) {
        try {
            const [ rows ] = await db.execute('SELECT id, username, profile_image, email, name FROM users WHERE id = ?', [id])
            return rows
        } catch (error) {
            console.info(error)
        }
    }
    static async add(newDataUser) {
        const { username, email, name, password } = newDataUser
        try {
            const [ rows ] = await db.execute('INSERT INTO users(username, email, name, password) VALUES (?, ?, ?, ?)', [username, email, name, password] )
            return rows
        } catch (error) {
            console.info(error)
        }
    }
    static async remove(id) {
        try {
            const [ rows ] = await db.execute('DELETE FROM users WHERE id = ?', [id])
            return rows
        } catch (error) {
            console.info(error)
        }
    }
    static async update(id, dataUserUpdate, profile_image) {
        let { username, email, name} = dataUserUpdate
        try {
            const [ dataUserDb ] = await this.getUserById(id)

            username = username !== undefined ? username : dataUserDb.username
            profile_image = profile_image !== undefined || profile_image !== null ? profile_image : dataUserDb.profile_image
            email = email !== undefined ? email : dataUserDb.email
            name = name !== undefined ? name : dataUserDb.name
            
            const [ rows ] = await db.execute('UPDATE users SET username = ?, profile_image = ?, email = ?, name = ? WHERE id = ?', [username, profile_image, email, name, +id])

            return {rows}
        } catch (error) {
            console.info(error.message)
        }
    }

}