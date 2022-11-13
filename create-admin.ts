// eslint-disable-next-line
;(async () => {
  const bcrypt = require('bcryptjs')
  const { createOne, getUserByEmail } = require('./repositories/users.reposotory.js')

  const user = {
    name: process.env.ADMIN_NAME,
    surname: process.env.ADMIN_SURNAME,
    patronymic: process.env.ADMIN_PATRONYMIC,
    role: process.env.ADMIN_ROLE,
    email: process.env.ADMIN_EMAIL,
    login: process.env.ADMIN_LOGIN,
    birthdate: process.env.ADMIN_BIRTHDATE,
    password: process.env.ADMIN_PASSWORD,
  }

  const hashedPassword = await bcrypt.hash(user.password, 10)

  try {
    const candidate = await getUserByEmail(user.email)

    if (candidate) {
      return
    }

    await createOne({
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      role: user.role,
      email: user.email,
      login: user.login,
      birthdate: user.birthdate,
      password: hashedPassword,
    })
  } catch (error: any) {
    console.log(error)
  }
})()
