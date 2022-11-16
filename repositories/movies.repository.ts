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
