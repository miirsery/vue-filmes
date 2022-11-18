import { TicketType } from '@/types/ticket.types'

export type UserSelfType = {
  id: number
  name: string
  surname: string
  patronymic: string
  role: 'admin' | 'user'
  email: string
  login: string
  register_date: string
  birthdate: string
  discount: number
  phone: string
  avatar: string
  tickets: TicketType[]
}
