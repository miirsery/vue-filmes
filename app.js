'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')

const authRouter = require('./routes/authtorization.router')
const usersRouter = require('./routes/users.router')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')

app.use('/api/v1', authRouter)
app.use('/api/v1/users', usersRouter)
app.get('/', (res, req) => {
    req.send({
        status: 'Ok',
        message: 'Success'
    })
})

const PORT = process.env.PORT || 3030

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`server staring on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
