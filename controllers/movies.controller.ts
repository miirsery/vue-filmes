import { Request, Response } from 'express'
const axios = require('axios').default

const moment = require('moment')

const {
  findOne,
  findAll,
  updateOne,
  getMostPopularMovie,
  createOne,
  updateVisit,
  getPopularMovies,
} = require('../repositories/movies.repository.ts')

const { checkMovieInFavoriteCinemas } = require('../repositories/cinemas.repository.js')

class MoviesController {
  async addMovie(req: Request, res: Response, path = '') {
    try {
      const { title, studio, genre, description, release_date, cinema_id } = req.body
      const pathToFile = path.replace('/app', 'http://localhost:3030/')

      const latestMovie = await createOne({
        title,
        studio,
        genre,
        description,
        release_date,
        pathToFile,
        cinema_id,
      }).then((r: any) => r.rows[0])

      if (latestMovie) {
        const cinemaTitleAndTelegramUserId = await checkMovieInFavoriteCinemas(
          latestMovie.id,
          latestMovie.cinema_id
        ).then((r: any) => r.rows)

        if (cinemaTitleAndTelegramUserId) {
          for (const data of cinemaTitleAndTelegramUserId) {
            // TODO: Проверка на то, есть ли кинотеатр у пользователя в избранном, если есть, то мы отправляем фильм, сессию в бота
            await axios.post('https://931e-176-51-109-142.eu.ngrok.io/api/v1/movies', {
              movie: latestMovie,
              cinema_title: data.title,
              telegram_id: data.telegram_id,
            })
          }
        }
      }

      return res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `Фильм ${title} успешно добавлен`,
        })
    } catch (error: any) {
      console.log(error)
      res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getMovies(req: Request, res: Response) {
    try {
      const mostPopular = req.query.most_popular

      if (mostPopular) {
        const data = await getMostPopularMovie().then((r: any) => {
          return r.rows.map((movie: any) => {
            const releaseDate = moment(movie.release_date).format('DD-MM-YYYY')

            delete movie.release_date

            return Object.assign(movie, { release_date: releaseDate })
          })
        })

        return res.status(200).setHeader('Content-Type', 'application/json').send(data)
      }

      const moviesData = await findAll().then((r: any) => {
        return r.rows.map((movie: any) => {
          const releaseDate = moment(movie.release_date).format('DD-MM-YYYY')

          delete movie.release_date

          return Object.assign(movie, { release_date: releaseDate })
        })
      })

      return res.status(200).setHeader('Content-Type', 'application/json').json(moviesData)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getTopPopularMovies(req: Request, res: Response) {
    try {
      const popularMovies = await getPopularMovies().then((r: any) => r.rows)

      return res.status(200).setHeader('Content-Type', 'application/json').json(popularMovies)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getMovie(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { user_id } = req.query
      const candidate = await findOne(+id)

      await updateVisit(user_id, id)

      return res.status(200).setHeader('Content-Type', 'application/json').send(candidate.rows[0])
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async updateMovie(req: Request, res: Response, path = '') {
    try {
      const body = req.body
      const pathToFile = path.replace('/app', 'http://localhost:3030/')
      if (body) {
        await updateOne({
          id: body.id,
          title: body.title,
          preview: pathToFile,
        })
      }

      if (!Object.keys(body).length) {
        return res.status(500).setHeader('Content-Type', 'application/json').json({
          message: 'Заполните поля',
        })
      }

      return res.status(200).setHeader('Content-Type', 'application/json').json({
        message: 'Успешно',
      })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new MoviesController()
