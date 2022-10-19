import { Request, Response } from 'express'
const { getAll, deleteOne, getFilteredHalls } = require('../repositories/halls.repository')

const db = require('../db')

class HallsController {
  async createHall(req: Request, res: Response) {
    try {
      const { title, seats_count, cinema_id } = req.body

      const data = await db.query('INSERT INTO halls (title, seats_count, cinema_id) VALUES ($1, $2, $3) RETURNING *', [
        title,
        seats_count,
        cinema_id,
      ])

      return res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `Зал ${data.rows[0].title} успешно создан`,
        })
    } catch (error: any) {
      res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async deleteHall(req: Request, res: Response) {
    try {
      const id = +req.params.id
      const candidate = await deleteOne(id)

      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `Зал ${candidate.rows[0].id} успешно удалён`,
        })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getHalls(req: Request, res: Response) {
    try {
      const filter = req.query

      if (filter.cinema_id) {
        const data = await getFilteredHalls(filter)

        return res.status(201).setHeader('Content-Type', 'application/json').json(data.rows)
      } else {
        const data = await getAll()
        console.log(data)

        return res.status(201).setHeader('Content-Type', 'application/json').json(data.rows)
      }
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new HallsController()
