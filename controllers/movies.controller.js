const db = require('../db')
const moment = require("moment");

class MoviesController {
    async addMovie(req, res, path='') {
        try {
            const { title, description, release_date } = req.body
            const pathToFile = path.replace('/app', 'http://localhost:3030/')
            const registrationDate = moment(release_date).format('DD-MM-YYYY hh:mm:ss')

            await db.query('INSERT INTO movies' +
                ' (title,' +
                ' description,' +
                ' release_date,' +
                ' preview' +
                ') VALUES ($1, $2, $3, $4)',
                [title, description, registrationDate, pathToFile])

            return res
                .status(201)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: `Фильм ${title} успешно добавлен`
                })
        } catch (error) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }

    async getMovies(req, res) {
        try {
            await db.query('SELECT * FROM movies').then(r => {
                const movies = r.rows.map((movie) => {
                    const registerDate = moment(movie.release_date).format('DD-MM-YYYY')

                    delete movie.release_date

                    return Object.assign(movie, {release_date: registerDate})
                })


                return res
                    .status(200)
                    .setHeader('Content-Type', 'application/json')
                    .send(movies)
            })
        } catch (error) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }
}

module.exports = new MoviesController()
