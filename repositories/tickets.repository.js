const db = require('../db')

module.exports = {
  getTotal: async () => db.query('SELECT COUNT(*) FROM ticket'),
  getAll: async () => db.query('SELECT * FROM ticket ORDER BY id'),
  getAllPagination: (filter) =>
    db.query('SELECT * FROM ticket ORDER BY id LIMIT=$1 OFFSET=$2', [filter.limit, filter.offset]),
  getFilteredTickets: async (userId) => db.query('SELECT * FROM ticket WHERE user_id=$1', [userId]),
  getFilteredOnSessionTickets: async (sessionId) => db.query('SELECT * FROM ticket WHERE session_id=$1', [sessionId]),
  getComparisonTickets: async (amount) => db.query('SELECT * FROM ticket WHERE price>$1', [amount]),
  getComparisonTicketsWithSeller: async (amount, sellerId) =>
    db.query('SELECT * FROM ticket' + ' WHERE price > $1 AND seller_id=$2', [amount, sellerId]),
  getTicketsWithSeller: async (sellerId) => db.query('SELECT * FROM ticket WHERE seller_id=$1', [sellerId]),
  getEqualsTickets: async (amount) => db.query('SELECT * FROM ticket WHERE $1=price', [amount]),
  addTicket: async (ticket) =>
    db.query(
      'INSERT INTO ticket' +
        ' (' +
        'session_id,' +
        ' seat,' +
        ' user_id,' +
        ' price,' +
        ' seller_id,' +
        ' movie_id,' +
        ' hall_id' +
        ') VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [ticket.session_id, ticket.seat, ticket.user_id, ticket.price, ticket.seller_id, ticket.movie_id, ticket.hall_id]
    ),
}
