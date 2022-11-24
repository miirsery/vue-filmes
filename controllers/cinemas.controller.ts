import { Request, Response } from 'express'
import moment from 'moment/moment'

const {
  createOne,
  deleteOne,
  getAll,
  getOne,
  addToFavorite,
  getFavoriteCinemas,
  getFavoriteCinemaByUserAndCinemaId,
  removeFromFavorite,
} = require('../repositories/cinemas.repository.js')
const { getAllByCinemaId } = require('../repositories/halls.repository.js')
const { getAllByHallId } = require('../repositories/sessions.repository.js')
const { findOne } = require('../repositories/movies.repository')

class HallsController {
  async createCinema(req: Request, res: Response) {
    try {
      const { street, location } = req.body

      await createOne(street, location)

      return res.status(201).setHeader('Content-Type', 'application/json').json({
        message: 'Кинотеатр успешно создан',
      })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async deleteCinema(req: Request, res: Response) {
    try {
      const id = req.params.id

      await deleteOne(id)

      return res.status(200).setHeader('Content-Type', 'application/json').json({
        message: 'Кинотеатр успешно удалён',
      })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getCinemas(req: Request, res: Response) {
    try {
      const { user_id } = req.query

      const cinemas = await getAll()

      const newCinemas: any = []

      // TODO: Переделать это на один SQL запрос
      for (const cinema of cinemas.rows) {
        const halls = await getAllByCinemaId(cinema.id)

        const favoriteCinema = await getFavoriteCinemaByUserAndCinemaId(user_id, cinema.id).then((r: any) => r.rows[0])

        newCinemas.push(Object.assign(cinema, { is_favorite: !!favoriteCinema }))

        cinema.halls = halls.rows
      }

      return res.status(200).setHeader('Content-Type', 'application/json').json(newCinemas)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getCinema(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { date } = req.query

      const cinema = await getOne(id).then((r: any) => r.rows[0])
      const halls: any = await getAllByCinemaId(cinema.id).then((r: any) => r.rows)

      const newSessions: any = []
      const newMovies: any = []

      for (const hall of halls) {
        const sessions = await getAllByHallId(hall.id, date).then((r: any) => r.rows)

        if (!sessions.length) {
          continue
        }

        for (const session of sessions) {
          const sessionTime = moment(session.time, 'HH:mm:ss').format('hh:mm')
          const sessionDate = moment(session.date).format('DD-MM-YYYY')
          const currentDate = moment(new Date()).format('DD-MM-YYYY')
          const currentTime = moment(new Date()).format('hh:mm')

          delete session.time
          delete session.date

          newSessions.push(
            Object.assign(session, {
              time: sessionTime,
              date: sessionDate,
              active: currentDate + currentTime <= sessionDate + sessionTime,
            })
          )
        }
      }

      if (!halls) {
        return res.status(500).setHeader('Content-Type', 'application/json').json({
          message: 'No halls',
        })
      }

      for (const session of newSessions) {
        const movies = await findOne(session.movie_id as number).then((r: any) => r.rows)

        for (const movie of movies) {
          const movieIndex = newMovies.findIndex((item: any) => item.id === movie.id)

          const currentSessions = newSessions.filter((item: any) => item.movie_id === movie.id)

          if (movieIndex === -1) {
            newMovies.push(
              Object.assign(movie, {
                sessions: currentSessions,
              })
            )
          }
        }
      }

      const result = Object.assign(cinema, {
        halls,
        movies: newMovies,
      })

      return res.status(200).setHeader('Content-Type', 'application/json').json(result)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getFavoriteMoviesList(req: Request, res: Response) {
    try {
      const { user_id } = req.query

      const favoriteHalls = await getFavoriteCinemas(user_id).then((r: any) => r.rows)

      return res.status(200).setHeader('Content-Type', 'application/json').json(favoriteHalls)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async addMoviesToFavorite(req: Request, res: Response) {
    try {
      const { cinema_id, user_id } = req.body

      const candidate = await getFavoriteCinemaByUserAndCinemaId(user_id, cinema_id).then((r: any) => r.rows)

      if (candidate.length) {
        await removeFromFavorite(cinema_id, user_id)
      } else {
        await addToFavorite(cinema_id, user_id)
      }

      return res.status(200).setHeader('Content-Type', 'application/json').json({
        message: 'Success',
      })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new HallsController()
