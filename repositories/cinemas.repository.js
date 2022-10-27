const db = require('../db')

module.exports = {
  getAll: async () => await db.query('SELECT id, title, address, location, phone FROM cinema'),
  createOne: async (street, location) =>
    await db.query('INSERT INTO cinemas (street, location) VALUES ($1, $2) RETURNING *', [street, location]),
  deleteOne: async (id) => db.query('DELETE FROM cinemas WHERE id=$1 RETURNING *', [id]),
}
