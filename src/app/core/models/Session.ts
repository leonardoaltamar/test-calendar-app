import { ExtendedProps } from "./ExtendedProps"

export interface Session {
  id: string
  image: any
  title: string
  description: string
  category: number
  city: string
  date: string | Date
  start: string | Date
  end: string | Date
  status: number
  extendedProps?: ExtendedProps
}
