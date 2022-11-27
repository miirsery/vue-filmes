import { TicketType } from '@/types/ticket.types'

export type UserSelfType = {
  id: number
  name: string
  surname: string
  patronymic: string
  role: 'admin' | 'user'
  email: string
  login: string
  telegram_username: string
  register_date: string
  birthdate: string
  discount: number
  phone: string
  avatar: string
  telegram_id?: number
  tickets: TicketType[]
}

export type TelegramUserType = {
  auth_date: number
  first_name: string
  hash: string
  id: number
  last_name: string
  photo_url: string
  username: string
  user_id?: number
}

export type TelegramDisconnectUserType = {
  user_id: number
}
