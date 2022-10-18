const db = require('../db')

module.exports = {
  getAll: async () => db.query('SELECT * FROM employee'),
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
