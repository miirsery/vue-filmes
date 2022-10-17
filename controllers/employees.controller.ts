import { Request, Response } from 'express'
const { getAll, filteredAll } = require('../repositories/employees.repository.js')

class EmployeesController {
  async getEmployees(req: Request, res: Response) {
    try {
      const filter = req.query.price

      if (filter) {
        const employees = await filteredAll('cashier', filter)

        return res.status(200).setHeader('Content-Type', 'application/json').json(employees.rows)
      }

      const employees = await getAll()
      return res.status(200).setHeader('Content-Type', 'application/json').json(employees.rows)
    } catch (error: any) {
      console.log(error)
      res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new EmployeesController()
