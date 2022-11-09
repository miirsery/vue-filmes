const db = require('../db')

module.exports = {
  getAll: async () => await db.query('SELECT id, title, address, location, phone FROM cinema'),
  createOne: async (street, location) =>
    await db.query('INSERT INTO cinema (street, location) VALUES ($1, $2) RETURNING *', [street, location]),
  deleteOne: async (id) => db.query('DELETE FROM cinema WHERE id=$1 RETURNING *', [id]),
}
