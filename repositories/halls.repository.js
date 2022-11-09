const db = require('../db')

module.exports = {
  getAll: async () =>
    db.query(
      'SELECT h.title as hall_title, h.id as id, c.title as cinema_title,' +
        ' (SELECT CAST(COUNT(*) AS INTEGER)' +
        ' FROM hall_seat h_s, hall h' +
        ' WHERE h_s.hall_id = h.id' +
        ' AND available = true' +
        ') as available_seats ' +
        ' FROM hall h, cinema c' +
        ' WHERE c.id = h.cinema_id'
    ),
  getOne: async (id) => db.query('SELECT * FROM hall WHERE id=$1', [id]),
  getAllByCinemaId: async (cinemaId) => await db.query('SELECT title FROM hall WHERE cinema_id=$1', [cinemaId]),
  getSchema: async () =>
    db.query(
      // eslint-disable-next-line max-len
      'SELECT y_position AS row, array_agg(row_to_json(hall_seat) ORDER BY x_position) AS seats FROM hall_seat GROUP BY y_position ORDER BY y_position;'
    ),
  getSchemaById: async (hallId) =>
    db.query(
      // eslint-disable-next-line max-len
      'SELECT y_position AS row, array_agg(row_to_json(hall_seat) ORDER BY x_position) AS seats FROM hall_seat WHERE hall_id=$1 GROUP BY y_position ORDER BY y_position;',
      [hallId]
    ),
  updateSchema: async (seat) => db.query('UPDATE hall_seat SET available = NOT available WHERE seat=$1', [seat]),
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
