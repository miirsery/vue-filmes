//TODO: поменять тип на int в y_position, x_position
export type SeatsSchemaType = {
  row: string | number
  seats: SeatType[]
}

export type SeatType = {
  available: boolean
  hall_id: number
  have?: boolean // Надо убрать
  id: number
  seat: number
  x_position: string | number // Поменять на x_position и тип
  y_position: string | number // Поменять на y_position и тип
}
