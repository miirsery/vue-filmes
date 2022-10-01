const db = require('../db')
const bcrypt = require('bcryptjs')
const moment = require('moment')

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/api/v1/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/api/v1')
    }

    next()
}

class AuthController {
    async register(req, res) {
        try {
            const { name, surname, patronymic, role, email, password, login } = req.body

            if (!password || !login) {
                return res
                    .status(500)
                    .setHeader('Content-Type', 'application/json')
                    .json({
                        message: `Поле ${(!login && 'Логин') || ''} ${(!password && 'Пароль') || ''} обязательно для заполнения`
                    })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const registrationDate = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
            console.log(registrationDate)

            // await db
            //     .query('INSERT INTO users' +
            //         ' (name,' +
            //         ' surname,' +
            //         ' patronymic,' +
            //         ' role, email,' +
            //         ' password,' +
            //         ' login, ' +
            //         'register_date' +
            //         ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            //     [name, surname, patronymic, role, email, hashedPassword, login, registrationDate])

            return res
                .status(201)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: `Пользователь ${name} успешно добавлен`
                })

        } catch (error) {
            res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: 'Что-то пошло не так :)'
                })
        }
    }
}

module.exports = new AuthController()
module.exports.checkAuthenticated = checkAuthenticated
module.exports.checkNotAuthenticated = checkNotAuthenticated
