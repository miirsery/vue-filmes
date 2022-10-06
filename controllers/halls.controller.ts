import { Request, Response } from "express";

const db = require('../db')

class HallsController {
    async createHall(req: Request, res: Response) {
        try {
            const { title, seats_count, cinema_id } = req.body

            const data = await db.query('INSERT INTO halls (title, seats_count, cinema_id) VALUES ($1, $2, $3) RETURNING *', [title, seats_count, cinema_id])
            console.log(data)
            return res
                .status(201)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: `Зал ${data.rows[0].title} успешно создан`
                })
        } catch (error: any) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }

    async deleteHall(req: Request, res: Response) {
        try {
            const id = req.params.id

            const candidate = await db.query('DELETE FROM halls WHERE id=$1 RETURNING *', [id])

            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: `Зал ${candidate.rows[0].id} успешно удалён`
                })
        } catch (error: any) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }

    async getHalls(req: Request, res: Response) {
        try {
            const data = await db.query('SELECT * FROM halls')

            return res
                .status(201)
                .setHeader('Content-Type', 'application/json')
                .json(data.rows)
        } catch (error: any) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }
}

module.exports = new HallsController()
