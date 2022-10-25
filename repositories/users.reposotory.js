const db = require('../db')

module.exports = {
  getAll: async () =>
    db.query(
      'SELECT' +
        ' id,' +
        ' name,' +
        ' surname,' +
        ' patronymic,' +
        ' role,' +
        ' email,' +
        ' login,' +
        ' avatar,' +
        ' birthdate,' +
        ' register_date,' +
        ' discount' +
        ' FROM person' +
        ' ORDER BY id;'
    ),
  setDiscount: async (discount) =>
    db.query(
      'UPDATE person' +
        ' SET discount = $1' +
        ' WHERE id = (SELECT id FROM person' +
        ' GROUP BY id' +
        ' ORDER BY MAX((SELECT CAST(COUNT(*) as INTEGER)' +
        ' FROM ticket' +
        ' WHERE ticket.user_id = person.id))' +
        ' DESC' +
        ' LIMIT 1' +
        ')',
      [discount]
    ),
}
