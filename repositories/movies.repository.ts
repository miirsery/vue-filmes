const db = require('../db')

module.exports = {
  createOne: async (movie: any) =>
    await db.query(
      'INSERT INTO movie' +
        ' (title,' +
        ' description,' +
        ' studio,' +
        ' genre,' +
        ' release_date,' +
        ' preview,' +
        ' cinema_id' +
        ') VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
      [movie.title, movie.description, movie.studio, movie.genre, movie.release_date, movie.pathToFile, movie.cinema_id]
    ),
  findOne: async (id: number) => db.query('SELECT * FROM movie WHERE id=$1', [id]),
  getByCinemaId: async (cinemaId: number) => db.query('SELECT * FROM movie WHERE id = $1', [cinemaId]),
  updateVisit: async (userId: number, movieId: number) =>
    db.query('INSERT INTO movie_visit (user_id, movie_id) VALUES ($1, $2)', [userId, movieId]),
  findAll: async () => db.query('SELECT * FROM movie ORDER BY movie.id DESC'),
  getMovieByTicket: async (sessionId: any) =>
    db.query('SELECT * FROM movie, session WHERE session.id = $1 AND movie.id = session.movie_id', [sessionId]),
  getMovieBySession: async (sessionId: number) => db.query('SELECT * FROM movie WHERE id=$1', [sessionId]),
  updateOne: async (args: any) =>
    db.query('UPDATE movie SET title=$1, preview=$2 WHERE id=$3', [args.title, args.preview, args.id]),
  getMostPopularMovie: async () =>
    await db.query(
      'SELECT *, MAX((SELECT CAST(COUNT(*) as INTEGER)' +
        ' FROM ticket' +
        ' WHERE ticket.movie_id = public.movie.id)) AS sales_count' +
        ' FROM movie' +
        ' GROUP BY movie.id' +
        ' LIMIT 1'
    ),
  getPopularMovies: async () =>
    await db.query(
      'SELECT * FROM movie' +
        ' GROUP BY movie.id ' +
        ' ORDER BY (' +
        ' MAX(' +
        ' (SELECT CAST(COUNT(*) as INTEGER)' +
        ' FROM movie_visit WHERE movie_visit.movie_id = public.movie.id))' +
        ' )' +
        ' DESC' +
        ' LIMIT 10;'
    ),
  searchMovies: async (searchValue: string) =>
    await db.query('SELECT * FROM movie WHERE title LIKE $1 ORDER BY title;', [searchValue]),
}
