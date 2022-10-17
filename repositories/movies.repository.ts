const db = require('../db')

module.exports = {
  findOne: async (id: number) => db.query('SELECT * FROM movie WHERE id=$1', [id]),
  findAll: async () => db.query('SELECT * FROM movie'),
  updateOne: async (args: any) =>
    db.query('UPDATE movie SET title=$1, preview=$2 WHERE id=$3', [args.title, args.preview, args.id]),
  // getMostPopularMovie: async () =>
  //   db.query(
  //     'SELECT id,' +
  //       ' COUNT(id)' +
  //       ' FROM movie' +
  //       ' GROUP BY id' +
  //       ' HAVING COUNT (id)' +
  //       ' = (SELECT MAX(current_count)' +
  //       ' FROM (' +
  //       ' SELECT id,' +
  //       ' COUNT(id) current_count' +
  //       ' FROM movie' +
  //       ' GROUP BY id))',
  //   ),
  getMostPopularMovie: () =>
    db.query(
      'SELECT ticket.id as ticket_id,' +
        ' movie.id,' +
        ' movie.genre,' +
        ' movie.release_date,' +
        ' movie.description,' +
        ' movie.preview,' +
        ' movie.studio,' +
        ' movie.title' +
        ' FROM movie' +
        ' LEFT JOIN ticket' +
        ' ON movie.id = ticket.movie_id',
    ),
}
