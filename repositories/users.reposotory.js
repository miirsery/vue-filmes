const db = require('../db')

module.exports = {
    getAll: async () => db.query('SELECT id, name, surname, patronymic, role, email, login, avatar, birthdate, register_date from person')
}