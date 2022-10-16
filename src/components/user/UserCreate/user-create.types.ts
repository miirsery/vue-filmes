export type UserCreateType = {
  name: string
  surname: string
  patronymic: string
  role: 'user' | 'admin' | 'moderator'
  email: string
  password: string
  login: string
  birthdate: string
}
