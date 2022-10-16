const db = require('../db')

module.exports = {
    findOne: async (id) => db.query('SELECT * FROM movie WHERE id=$1', [id]),
    findAll: async () => db.query('SELECT * FROM movie'),
    updateOne: async (args) => db.query(`UPDATE movie SET title=$1, preview=$2 WHERE id=$3`, [args.title, args.preview, args.id]),
}