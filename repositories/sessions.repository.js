const db = require('../db')

module.exports = {
  getAll: async () => await db.query('SELECT * FROM sessions'),
  createOne: async (session) =>
    await db.query('INSERT INTO sessions (date, price, hall_id, movie_id) VALUES ($1, $2, $3, $4)', [
      session.dateAndTime,
      session.price,
      session.hall_id,
      session.movie_id,
    ]),
}
