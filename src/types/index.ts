import { Media } from "@/payload-types"

export interface IRoom {
  _id?: string
  title: string
  content?: string
  price: number
  available?: boolean
  type?: string
  tags?: string[]
  meta?: Record<string, any>
  lat: number
  lng: number
  city: string
  state: string
  status: string
  photos: Media[]
  featuredImage: string
  maxCapacity: number
  googleMapLink?: string
  createdAt?: Date[]
  updatedAt?: Date[]
}