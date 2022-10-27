import { Request, Response } from 'express'
import moment from 'moment'

const { createOne, getAll } = require('../repositories/sessions.repository.js')

class SessionsController {
  async createSession(req: Request, res: Response) {
    try {
      const { date, time, price, hall_id, movie_id } = req.body
      const newDate = moment(new Date(date)).format('YYYY-MM-DD')
      const dateAndTime = new Date(`${newDate}T${time}`)

      await createOne({
        dateAndTime,
        price,
        hall_id,
        movie_id,
      })

      return res.status(201).setHeader('Content-Type', 'application/json').json({
        message: 'Сессия добавлена',
      })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getSessions(req: Request, res: Response) {
    try {
      const data = await getAll()

      return res.status(200).setHeader('Content-Type', 'application/json').json(data.rows)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new SessionsController()
