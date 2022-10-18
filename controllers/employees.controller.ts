import { Request, Response } from 'express'
import moment from 'moment'
const { getAll, filteredAll } = require('../repositories/employees.repository.js')

class EmployeesController {
  async getEmployees(req: Request, res: Response) {
    try {
      const filter = req.query.price

      if (filter) {
        const employees = await filteredAll('cashier', filter).then((r: any) => {
          return r.rows.map((employee: any) => {
            const birthdate = moment(employee.birthdate).format('DD-MM-YYYY')

            delete employee.birthdate

            return Object.assign(employee, { birthdate })
          })
        })

        return res.status(200).setHeader('Content-Type', 'application/json').json(employees)
      }

      const employees = await getAll().then((r: any) => {
        return r.rows.map((employee: any) => {
          const birthdate = moment(employee.birthdate).format('DD-MM-YYYY')

          delete employee.birthdate

          return Object.assign(employee, { birthdate })
        })
      })

      return res.status(200).setHeader('Content-Type', 'application/json').json(employees)
    } catch (error: any) {
      console.log(error)
      res.status(500).setHeader('Content-Type', 'application/json').json({
        message: error.detail,
      })
    }
  }
}

module.exports = new EmployeesController()
