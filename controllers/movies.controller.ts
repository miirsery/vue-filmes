import { Request, Response } from 'express'

const moment = require('moment')

const { findOne, findAll, updateOne, getMostPopularMovie, createOne } = require('../repositories/movies.repository.ts')

class MoviesController {
  async addMovie(req: Request, res: Response, path = '') {
    try {
      const { title, studio, genre, description, release_date } = req.body
      const pathToFile = path.replace('/app', 'http://localhost:3030/')

      await createOne({
        title,
        studio,
        genre,
        description,
        release_date,
        pathToFile,
      })

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

      return res.status(200).setHeader('Content-Type', 'application/json').send(moviesData)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getMovie(req: Request, res: Response) {
    try {
      const id = req.params.id
      const candidate = await findOne(id)

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
