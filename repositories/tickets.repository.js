const db = require('../db')

module.exports = {
  getTotal: async () => db.query('SELECT COUNT(*) FROM ticket'),
  getAll: async () =>
    db.query(
      ' SELECT t.id, t.seat as seat, t.session_id, t.buy_date, t.price, t.seller_id, p.name AS user_name, m.title AS movie_title' +
        ' FROM ticket t, session s, movie m, person p' +
        ' WHERE s.movie_id = m.id AND p.id = t.user_id;'
    ),
  getAllByUserId: async (userId) => await db.query('SELECT * FROM ticket WHERE user_id = $1', [userId]),
  getAllPagination: (filter) =>
    db.query('SELECT * FROM ticket ORDER BY id LIMIT=$1 OFFSET=$2', [filter.limit, filter.offset]),
  getFilteredTickets: async (userId) => db.query('SELECT * FROM ticket WHERE user_id=$1', [userId]),
  getFilteredOnSessionTickets: async (sessionId) => db.query('SELECT * FROM ticket WHERE session_id=$1', [sessionId]),
  getComparisonTickets: async (amount) => db.query('SELECT * FROM ticket WHERE price>$1', [amount]),
  getComparisonTicketsWithSeller: async (amount, sellerId) =>
    db.query('SELECT * FROM ticket' + ' WHERE price > $1 AND seller_id=$2', [amount, sellerId]),
  getTicketsWithSeller: async (sellerId) => db.query('SELECT * FROM ticket WHERE seller_id=$1', [sellerId]),
  getEqualsTickets: async (amount) => db.query('SELECT * FROM ticket WHERE $1=price', [amount]),
  addTicket: async (seat, ticket) =>
    await db.query(
      'INSERT INTO ticket' +
        ' (' +
        ' session_id,' +
        ' seat,' +
        ' user_id,' +
        ' price,' +
        ' seller_id' +
        ') VALUES ($1, $2, $3, $4, $5)',
      [ticket.session_id, seat, ticket.user_id, ticket.price, ticket.seller_id]
    ),
  deleteById: async (ticketId) => db.query('DELETE FROM ticket WHERE id=$1', [ticketId]),
}
