const jwt = require('jsonwebtoken')

import { NextFunction, Request, Response } from 'express'

const whiteListUrls = ['/api/v1/movies']

const check = (req: Request, res: Response, next: NextFunction, roles = [] as string[]): any => {
  const token = req.headers.authorization?.replace('Bearer', '').trim()

  jwt.verify(token, 'secretKey', async (err: any, user: any) => {
    if (err) {
      return res.status(403).setHeader('Content-Type', 'application/json').json({ message: 'Not enough permissions' })
    }

    if (user.platform === 'site') {
      if (user.role === 'user') {
        if (whiteListUrls.includes(req.baseUrl) && req.method === 'GET') {
          return next()
        }
        return res.status(403).setHeader('Content-Type', 'application/json').json({ message: 'Not enough permissions' })
      }

      return next()
    } else {
      if (roles.includes(user.role)) {
        if (user.role === 'user') {
          return res
            .status(403)
            .setHeader('Content-Type', 'application/json')
            .json({ message: 'Not enough permissions' })
        }

        return next()
      }
    }

    return res.status(403).setHeader('Content-Type', 'application/json').json({ message: 'Not enough permissions' })
  })
}

module.exports = { checkRole: check }
