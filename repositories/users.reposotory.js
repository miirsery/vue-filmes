const db = require('../db')

module.exports = {
  getAll: async () =>
    await db.query(
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
        ' ORDER BY id' +
        ' ASC' +
        ' LIMIT 10' +
        ' OFFSET 0;'
    ),
  getUserByEmail: async (email) =>
    await db.query('SELECT * FROM person WHERE email=$1', [email]).then((r) => r.rows[0]),
  getUserById: async (id) => await db.query('SELECT * FROM person WHERE id=$1', [id]).then((r) => r.rows[0]),
  createOne: async (user) =>
    await db.query(
      'INSERT INTO person' +
        ' (name,' +
        ' surname,' +
        ' patronymic,' +
        ' role,' +
        ' email,' +
        ' password,' +
        ' login, ' +
        ' birthdate' +
        ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user.name, user.surname, user.patronymic, user.role, user.email, user.hashedPassword, user.login, user.birthdate]
    ),
  setDiscount: async (discount) =>
    await db.query(
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
  updateUserTelegramId: async (telegramUsername, telegramId, userId) =>
    db.query('UPDATE person SET telegram_username = $1, telegram_id = $2 WHERE id = $3', [
      telegramUsername,
      telegramId,
      userId,
    ]),
  setOne: async (user) =>
    await db.query(
      'INSERT INTO person' +
        ' (name,' +
        ' surname,' +
        ' patronymic,' +
        ' role,' +
        ' email,' +
        ' password,' +
        ' login, ' +
        ' birthdate' +
        ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [user.name, user.surname, user.patronymic, user.role, user.email, user.password, user.login, user.birthdate]
    ),
  deleteOne: async (id) => await db.query('DELETE FROM person WHERE id=$1 RETURNING *', [id]),
}
