'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
import { Application, Request, Response } from 'express'

const express = require('express')

const app: Application = express(),
  cors = require('cors'),
  flash = require('express-flash'),
  session = require('express-session'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  swaggerJsdoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express'),
  authRouter = require('./routes/authtorization.router'),
  usersRouter = require('./routes/users.router'),
  moviesRouter = require('./routes/movies.router.js'),
  hallsRouter = require('./routes/halls.router'),
  cinemasRouter = require('./routes/cinemas.router'),
  sessionsRouter = require('./routes/sessions.router'),
  ticketsRouter = require('./routes/tickets.router'),
  employeesRouter = require('./routes/employees.router')

app.use(express.static('public'))
app.use('/media', express.static(__dirname + '/media'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(flash())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/movies', moviesRouter)
app.use('/api/v1/halls', hallsRouter)
app.use('/api/v1/cinemas', cinemasRouter)
app.use('/api/v1/sessions', sessionsRouter)
app.use('/api/v1/tickets', ticketsRouter)
app.use('/api/v1/employees', employeesRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: 'Ok',
    message: 'Success',
  })
})

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
    servers: [
      {
        url: 'http://localhost:3030',
      },
    ],
  },
  apis: ['./routes/*.js'],
}

const specs = swaggerJsdoc(options)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

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
