import { Request, Response } from 'express'

const bcrypt = require('bcryptjs')
const moment = require('moment/moment')
const axios = require('axios').default
const {
  getAll,
  setDiscount,
  setOne,
  createOne,
  deleteOne,
  updateUserTelegramId,
} = require('../repositories/users.reposotory.js')

const { excelToData } = require('../utils/excel-to-data.js')
const { transporter } = require('../utils/mailer.js')
const fs = require('fs-extra')

class UserController {
  async registerUser(req: Request, res: Response, user: any = {}) {
    // eslint-disable-next-line max-len
    const emailRePattern =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

    try {
      const {
        name = null,
        surname = null,
        patronymic = null,
        role = 'user',
        email,
        password,
        login,
        birthdate = null,
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
          message: 'Пароль должен содержать больше 6-ти символов',
        })
      }

      if (!emailRePattern.test(email)) {
        return res.status(500).setHeader('Content-Type', 'application/json').json({
          message: 'Enter a correct email and try again!',
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await createOne({
        name,
        surname,
        patronymic,
        role,
        email,
        hashedPassword,
        login,
        birthdate,
      })

      return res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `Пользователь ${name} успешно добавлен`,
        })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id
      const candidate = await deleteOne(id)

      return res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `Пользователь ${candidate.rows[0].name} успешно удалён`,
        })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id
      // console.log(id)
      // TODO: Заврешить потом
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await getAll().then((r: any) => {
        return r.rows.map((user: any) => {
          const changedBirthdate = moment(user.birthdate).format('DD-MM-YYYY')
          const changedRegisterDate = moment(user.register_date).format('DD-MM-YYYY ; HH:MM:SS')

          delete user.birthdate
          delete user.register_date

          return Object.assign(user, { birthdate: changedBirthdate, register_date: changedRegisterDate })
        })
      })

      return res.status(200).setHeader('Content-Type', 'application/json').json(users)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async setUserDiscount(req: Request, res: Response) {
    try {
      const discount = req.body.discount

      const data = await setDiscount(+discount)

      return res.status(200).setHeader('Content-Type', 'application/json').json(data)
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async getExampleFile(req: Request, res: Response) {
    try {
      return res.status(200).setHeader('Content-Type', 'application/json').json({
        path: 'Download example: <a href="http://localhost:3030/media/csv/usersFileExample.xlsx">download</a>',
      })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: 'File doesnt exists',
      })
    }
  }

  async createGroupUsers(req: Request, res: Response, path = '') {
    try {
      const data = await excelToData(path).then((r: any) => r.Sheet1)

      for (const user of data) {
        const hashedPassword = await bcrypt.hash(user.password, 10)

        delete user.password

        await setOne(Object.assign(user, { password: hashedPassword }))
      }

      fs.remove('/app/media/tempCSV/' + path)

      await transporter.sendMail({
        from: 'nikiforov.byrip@yandex.ru',
        to: 'sania.nika@mail.ru',
        subject: 'Message from Node js',
        text: 'This message was sent from Node js server.',
        html: '<div>All users have been successfully added </div>',
      })

      return res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
          message: `We send email on ${process.env.MAILER_EMAIL}`,
        })
    } catch (error: any) {
      console.log(error)
      return res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }

  async loginWithTelegram(req: Request, res: Response) {
    try {
      // TODO: Добавить проверку через hash
      // https://gist.github.com/anonymous/6516521b1fb3b464534fbc30ea3573c2
      const { user_id, first_name, hash, id, last_name, photo_url, username, auth_date } = req.body

      await axios.post('https://931e-176-51-109-142.eu.ngrok.io/api/v1/authorization', {
        user: {
          username,
          id,
        },
        _auth: {
          auth_date,
          hash,
        },
      })

      await updateUserTelegramId(username, id, user_id)

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

  async unlinkWithTelegram(req: Request, res: Response) {
    try {
      const { user_id } = req.body

      await updateUserTelegramId(null, null, user_id)

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

module.exports = new UserController()
