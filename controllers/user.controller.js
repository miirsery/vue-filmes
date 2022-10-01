const db = require('../db')
const bcrypt = require('bcryptjs')

class UserController {
    async getSelf(req, res) {
        try {
            const { id } = req.body

            const user = await db.query(`SELECT * FROM users
                            WHERE id=${id}
                            `)
            console.log(user.rows)
        } catch (e) {
            return res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: 'Что-то пошло не так :с'
                })
        }
    }
}

module.exports = new UserController()
