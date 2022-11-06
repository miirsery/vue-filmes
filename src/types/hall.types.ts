export type SeatsSchemaType = {
  row: number
  seats: SeatType[]
}

export type SeatType = {
  available: boolean
  hall_id: number
  have?: boolean // Надо убрать
  id: number
  seat: number
  x_position: number
  y_position: number
}
