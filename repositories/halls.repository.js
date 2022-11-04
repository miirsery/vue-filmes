const db = require('../db')

module.exports = {
  getAll: async () =>
    db.query(
      'SELECT h.title as hall_title, h.id as id, c.title as cinema_title' +
        ' FROM hall h, cinema c' +
        ' WHERE c.id = h.cinema_id'
    ),
  getOne: async (id) => db.query('SELECT * FROM hall WHERE id=$1', [id]),
  getAllByCinemaId: async (cinemaId) => await db.query('SELECT title FROM hall WHERE cinema_id=$1', [cinemaId]),
  getSchema: async () => db.query('SELECT * FROM hall_seat'),
  createOne: async (hall) =>
    await db.query('INSERT INTO hall (title, cinema_id) VALUES ($1, $2) RETURNING *', [hall.title, hall.cinema_id]),
  createSchema: async (data) =>
    await db.query(
      'INSERT INTO hall_seat' +
        ' (seat, x_position, y_position, available, have, hall_id' +
        ') VALUES ($1, $2, $3, $4, $5, $6)' +
        ' RETURNING *',
      [data.seat, data.x_position, data.y_position, data.available, data.have, data.hall_id]
    ),
  deleteOne: async (id) => db.query('DELETE FROM hall WHERE id=$1 RETURNING *', [id]),
  removeSeat: async (id) => db.query('UPDATE hall SET seats_count = seats_count - 1 WHERE id=$1', [id]),
  getFilteredHalls: async (filter) => db.query('SELECT * FROM hall WHERE cinema_id=$1', [filter.cinema_id]),
}
