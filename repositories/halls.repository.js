const db = require('../db')

module.exports = {
  getAll: async () => db.query('SELECT * FROM hall'),
  getOne: async (id) => db.query('SELECT * FROM hall WHERE id=$1', [id]),
  deleteOne: async (id) => db.query('DELETE FROM hall WHERE id=$1 RETURNING *', [id]),
  removeSeat: async (id) => db.query('UPDATE hall SET seats_count = seats_count - 1 WHERE id=$1', [id]),
  getFilteredHalls: async (filter) => db.query('SELECT * FROM hall WHERE cinema_id=$1', [filter.cinema_id]),
}
