import { FileType } from '@/types/common.types'

export type MovieCreateType = {
  title: string
  studio: string
  genre: string
  description: string
  preview: FileType | null
  release_date: string
}
