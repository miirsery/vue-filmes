export type UserType = {
  id: number
  name: string
  surname: string
  patronymic: string
  role: 'user' | 'admin' | 'moderator'
  email: string
  login: string
  password: string
  register_date: string
  birthdate: string
  avatar: string
  discount: number
}
