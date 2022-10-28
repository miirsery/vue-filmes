import { Request, Response } from 'express'

const { createOne, deleteOne, getAll } = require('../repositories/cinemas.repository.js')
const { getAllByCinemaId } = require('../repositories/halls.repository.js')

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
      const cinemas = await getAll()

      const newCinemas: any = []

      // TODO: Переделать это на один SQL запрос
      for (const cinema of cinemas.rows) {
        const halls = await getAllByCinemaId(cinema.id)

        newCinemas.push(cinema)

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
}

module.exports = new HallsController()
