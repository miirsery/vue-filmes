const db = require('../db')

module.exports = {
  getAll: async () => await db.query('SELECT id, title, address, lng, lat, description, preview, phone FROM cinema'),
  getOne: async (id) => await db.query('SELECT id, title, address, lng, lat, phone FROM cinema WHERE id=$1', [id]),
  createOne: async (street, location) =>
    await db.query('INSERT INTO cinema (street, location) VALUES ($1, $2) RETURNING *', [street, location]),
  deleteOne: async (id) => db.query('DELETE FROM cinema WHERE id=$1 RETURNING *', [id]),
  getFavoriteCinemas: async (userId) => db.query('SELECT * FROM cinema_favorite WHERE userId=$1', [userId]),
  getFavoriteCinemaByUserAndCinemaId: async (userId, cinemaId) =>
    db.query('SELECT * FROM cinema_favorite WHERE user_id=$1 AND cinema_id=$2', [userId, cinemaId]),
  addToFavorite: async (cinemaId, userId) =>
    db.query('INSERT INTO cinema_favorite (user_id, cinema_id) VALUES ($1, $2)', [cinemaId, userId]),
  removeFromFavorite: async (cinemaId, userId) =>
    db.query('DELETE FROM cinema_favorite WHERE cinema_id=$1 AND user_id=$2', [cinemaId, userId]),
  checkMovieInFavoriteCinemas: async (movieId, cinemaId) =>
    db.query(
      'SELECT c.title FROM cinema AS c JOIN cinema_favorite AS c_f ON c_f.cinema_id = $1 AND c.id = $1 JOIN movie AS m ON m.id = $2;',
      [cinemaId, movieId]
    ),
}
