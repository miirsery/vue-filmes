import { Request, Response } from 'express'
const {
  getAll,
  deleteOne,
  getFilteredHalls,
  getOne,
  createOne,
  createSchema,
  getSchema,
} = require('../repositories/halls.repository.js')

class HallsController {
  async createHall(req: Request, res: Response) {
    try {
      const { title, cinema_id } = req.body

      const data = await createOne({
        title,
        cinema_id,
      })

      return res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `Зал ${data.rows[0].title} успешно создан`,
        })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async createSchema(req: Request, res: Response) {
    try {
      const body = req.body

      for (const item of body.items) {
        await createSchema({
          seat: item.seat,
          x_position: item.x,
          y_position: item.y,
          available: item.available,
          have: item.have,
          hall_id: body.hall_id,
        })
      }

      return res.status(201).setHeader('Content-Type', 'application/json').json({
        message: 'Success',
      })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
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

        return res.status(200).setHeader('Content-Type', 'application/json').json(data.rows)
      } else {
        const data = await getAll().then((r: any) => r.rows)

        return res.status(200).setHeader('Content-Type', 'application/json').json(data)
      }
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getHall(req: Request, res: Response) {
    try {
      const id = +req.params.id

      if (id) {
        const data = await getOne(id)

        return res.status(200).setHeader('Content-Type', 'application/json').json(data.rows[0])
      }
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getSchema(req: Request, res: Response) {
    try {
      const schema = await getSchema().then((r: any) => r.rows)

      return res.status(200).setHeader('Content-Type', 'application/json').json(schema)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new HallsController()
