import { Request, Response } from 'express'

const db = require('../db')

class HallsController {
  async createCinema(req: Request, res: Response) {
    try {
      const { street, location } = req.body

      const data = await db.query('INSERT INTO cinemas (street, location) VALUES ($1, $2) RETURNING *', [
        street,
        location,
      ])

      console.log(data)

      return res.status(201).setHeader('Content-Type', 'application/json').json({
        message: 'Кинотеатр успешно создан',
      })
    } catch (error: any) {
      res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async deleteCinema(req: Request, res: Response) {
    try {
      const id = req.params.id

      await db.query('DELETE FROM cinemas WHERE id=$1 RETURNING *', [id])

      return res.status(200).setHeader('Content-Type', 'application/json').json({
        message: 'Кинотеатр успешно удалён',
      })
    } catch (error: any) {
      res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getCinemas(req: Request, res: Response) {
    try {
      const cinemas = await db.query('SELECT id, title, address, location, phone FROM cinema')

      const newCinemas: any = []

      for (const cinema of cinemas.rows) {
        const halls = await db.query('SELECT title, seats_count FROM hall WHERE cinema_id=$1', [cinema.id])

        newCinemas.push(cinema)

        cinema.halls = halls.rows
      }

      return res.status(201).setHeader('Content-Type', 'application/json').json(newCinemas)
    } catch (error: any) {
      res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new HallsController()
