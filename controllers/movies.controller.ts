import {Request, Response} from "express";

const db = require('../db')
const moment = require("moment");
const { findOne, findAll, updateOne} = require("../repositories/movies.repository");

class MoviesController {
    async addMovie(req: Request, res: Response, path='') {
        try {
            const { title, description, release_date } = req.body
            const pathToFile = path.replace('/app', 'http://localhost:3030/')
            const registrationDate = moment(release_date).format('DD-MM-YYYY hh:mm:ss')

            await db.query('INSERT INTO movie' +
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
        } catch (error: any) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }

    async getMovies(req: Request, res: Response) {
        try {
            await findAll().then((r: any) => {
                const movies = r.rows.map((movie: any) => {
                    const registerDate = moment(movie.release_date).format('DD-MM-YYYY')

                    delete movie.release_date

                    return Object.assign(movie, {release_date: registerDate})
                })


                return res
                    .status(200)
                    .setHeader('Content-Type', 'application/json')
                    .send(movies)
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

    async getMovie(req: Request, res: Response) {
        try {
            const id = req.params.id
            const candidate = await findOne(id)

            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .send(candidate.rows[0])
        } catch (error: any) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }

    async updateMovie(req: Request, res: Response) {
        try {
            const body = req.body

            if (body) {
                await updateOne({
                    id: body.id,
                    title: body.title
                })
            }

            if (!Object.keys(body).length) {
                return res
                    .status(500)
                    .setHeader('Content-Type', 'application/json')
                    .json({
                        message: 'Заполните поля'
                    })
            }


            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: 'Успешно'
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
}

module.exports = new MoviesController()
