const db = require('../db')

module.exports = {
  getAll: async () => db.query('SELECT * FROM employee'),
  createOne: async (employee) =>
    db.query(
      'INSERT INTO employee' +
        ' (name,' +
        ' surname,' +
        ' position,' +
        ' email,' +
        ' login,' +
        ' birthdate,' +
        ' cinema_id,' +
        ' password' +
        ') ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        employee.name,
        employee.surname,
        employee.position,
        employee.email,
        employee.login,
        employee.birthdate,
        employee.cinema_id,
        employee.password,
      ]
    ),
  filteredAll: async (position, price) =>
    db.query(
      'SELECT * from employee' +
        ' WHERE employee.position=$1' +
        ' AND (SELECT SUM(ticket.price)' +
        ' FROM ticket' +
        ' WHERE ticket.seller_id=employee.id) > $2',
      [position, price]
    ),
}
