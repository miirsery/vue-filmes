const db = require('../db')

module.exports = {
    findOne: async (id: number) => db.query('SELECT * FROM movie WHERE id=$1', [id]),
    findAll: async () => db.query('SELECT * FROM movie'),
    updateOne: async (args: any) => db.query(`UPDATE movie SET title=$1 WHERE id=$2`, [args.title, args.id]),
}