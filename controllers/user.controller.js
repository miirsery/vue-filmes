const db = require('../db')

class UserController {
    async deleteUser(req, res) {
        try {
            const id = req.params.id
           // const candidate = await db.query('DELETE FROM users WHERE id=$1', [id]).rows
            // TODO: Доделать вывод удаляемого имени
            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: `Пользователь ${id} успешно удалён`
                })

            // TODO: не выводится успешное сообщение

        } catch (e) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: e.detail
                })
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id
            // TODO: Заврешить потом
        } catch (e) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: e.detail
                })
        }
    }
}

module.exports = new UserController()
