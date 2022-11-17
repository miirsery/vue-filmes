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
        ' preview' +
        ') VALUES ($1, $2, $3, $4, $5, $6)',
      [movie.title, movie.description, movie.studio, movie.genre, movie.release_date, movie.pathToFile]
    ),
  findOne: async (id: number) => db.query('SELECT * FROM movie WHERE id=$1', [id]),
  getOneByCinemaId: async (cinemaId: number) => db.query('SELECT * FROM movie WHERE id = $1', [cinemaId]),
  findAll: async () => db.query('SELECT * FROM movie'),
  // getMovieByTicket: async (sessionId: any) =>
  //   db.query(
  //     'SELECT movie.id as movie_id, movie.title as movie_title, movie.studio as movie_studio FROM ticket LEFT JOIN session ON ticket.session_id = $1 LEFT JOIN movie ON movie.id = session.movie_id WHERE movie.id = session.movie_id',
  //     [sessionId]
  //   ),
  getMovieByTicket: async (sessionId: any) => db.query('SELECT movie.id as movie_id, movie.title as movie_title, movie.studio as movie_studio FROM movie, session WHERE session.id = $1 AND movie.id = session.movie_id', [sessionId]),
  getMovieBySession: async (sessionId: number) => db.query('SELECT * FROM movie WHERE id=$1', [sessionId]),
  updateOne: async (args: any) =>
    db.query('UPDATE movie SET title=$1, preview=$2 WHERE id=$3', [args.title, args.preview, args.id]),
  getMostPopularMovie: () =>
    db.query(
      'SELECT *, MAX((SELECT CAST(COUNT(*) as INTEGER)' +
        ' FROM ticket' +
        ' WHERE ticket.movie_id = public.movie.id)) AS sales_count' +
        ' FROM movie' +
        ' GROUP BY movie.id' +
        ' LIMIT 1'
    ),
}
