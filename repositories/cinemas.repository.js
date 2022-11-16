const db = require('../db')

module.exports = {
  getAll: async () => await db.query('SELECT id, title, address, lng, lat, phone FROM cinema'),
  getOne: async (id) => await db.query('SELECT id, title, address, lng, lat, phone FROM cinema WHERE id=$1', [id]),
  createOne: async (street, location) =>
    await db.query('INSERT INTO cinema (street, location) VALUES ($1, $2) RETURNING *', [street, location]),
  deleteOne: async (id) => db.query('DELETE FROM cinema WHERE id=$1 RETURNING *', [id]),
}
