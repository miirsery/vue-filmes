const db = require('../db')

module.exports = {
  getAll: async () => db.query('SELECT * FROM hall'),
  deleteOne: async (id) => db.query('DELETE FROM hall WHERE id=$1 RETURNING *', [id]),
  getFilteredHalls: async (filter) => db.query('SELECT * FROM hall WHERE cinema_id=$1', [filter.cinema_id]),
}
