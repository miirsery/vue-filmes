const jwt = require('jsonwebtoken')

import { NextFunction, Request, Response } from 'express'

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer', '').trim()

  jwt.verify(token, 'secretKey', async (err: any, user: any) => {
    if (err) {
      return res.status(403).setHeader('Content-Type', 'application/json').json({ message: 'Not enough permissions' })
    }

    if (user.platform === 'dashboard' && user.role === 'user') {
      return res.status(403).setHeader('Content-Type', 'application/json').json({ message: 'Not enough permissions' })
    }

    return next()
  })
}

module.exports = { checkAuth }
