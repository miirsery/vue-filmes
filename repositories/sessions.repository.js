const db = require('../db')

// class SessionsRepository {
//   async getAll() {
//     return await db.query('SELECT * FROM session')
//   }
// }

// module.exports = new SessionsRepository()

module.exports = {
  getAll: async () => await db.query('SELECT * FROM session'),
  getAllByHallId: async (hallId) => {
    return await db.query('SELECT * FROM session WHERE hall_id=$1', [hallId])
  },
  createOne: async (session) =>
    await db.query('INSERT INTO session (date, price, hall_id, movie_id) VALUES ($1, $2, $3, $4)', [
      session.dateAndTime,
      session.price,
      session.hall_id,
      session.movie_id,
    ]),
}
