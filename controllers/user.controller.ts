import { Request, Response } from 'express'

const db = require('../db')
const bcrypt = require('bcryptjs')
const moment = require('moment/moment')
const { getAll } = require('../repositories/users.reposotory.js')

class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const {
        name = null,
        surname = null,
        patronymic = null,
        role = 'user',
        email,
        password,
        login,
        birthdate,
      } = req.body

      if (!password || !login) {
        return res
          .status(500)
          .setHeader('Content-Type', 'application/json')
          .json({
            message: `Поле ${(!login && 'Логин') || ''} ${(!password && 'Пароль') || ''} обязательно для заполнения`,
          })
      }

      if (password.length < 6) {
        return res.status(500).setHeader('Content-Type', 'application/json').json({
          message: 'Пароль должен содеражть больше 6-ти символов',
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await db.query(
        'INSERT INTO person' +
          ' (name,' +
          ' surname,' +
          ' patronymic,' +
          ' role,' +
          ' email,' +
          ' password,' +
          ' login, ' +
          ' birthdate' +
          ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [name, surname, patronymic, role, email, hashedPassword, login, birthdate],
      )

      return res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `Пользователь ${name} успешно добавлен`,
        })
    } catch (error: any) {
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id
      const candidate = await db.query('DELETE FROM person WHERE id=$1 RETURNING *', [id])

      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `Пользователь ${candidate.rows[0].name} успешно удалён`,
        })
    } catch (error: any) {
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id
      // TODO: Заврешить потом
    } catch (error: any) {
      res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await getAll().then((r: any) => {
        return r.rows.map((user: any) => {
          const changedBirthdate = moment(user.birthdate).format('DD-MM-YYYY')
          const changedRegisterDate = moment(user.register_date).format('DD-MM-YYYY;HH:MM:SS')

          delete user.birthdate
          delete user.register_date

          return Object.assign(user, { birthdate: changedBirthdate, register_date: changedRegisterDate })
        })
      })

      return res.status(200).setHeader('Content-Type', 'application/json').json(users)
    } catch (error: any) {
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getUsersTable(req: Request, res: Response) {
    try {
      const data = await db.query('SELECT * FROM person')

      return res.status(200).setHeader('Content-Type', 'application/json').json(data)
    } catch (error: any) {
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new UserController()
