const db = require('../db')

module.exports = {
  getAll: async () => db.query('SELECT * from ticket'),
  getFilteredTickets: async (userId) => db.query('SELECT * FROM ticket WHERE user_id=$1', [userId]),
  getFilteredOnSessionTickets: async (sessionId) => db.query('SELECT * FROM ticket WHERE session_id=$1', [sessionId]),
  getComparisonTickets: async (amount) => db.query('SELECT * FROM ticket WHERE price>$1', [amount]),
  getEqualsTickets: async (amount) => db.query('SELECT * FROM ticket WHERE $1=price', [amount]),
  addTicket: async (ticket) =>
    db.query('INSERT INTO ticket (session_id, seat, user_id, price, seller_id) VALUES ($1, $2, $3, $4, $5)', [
      ticket.session_id,
      ticket.seat,
      ticket.user_id,
      ticket.price,
      ticket.seller_id,
    ]),
}
