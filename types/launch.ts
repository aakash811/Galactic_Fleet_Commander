export interface Launch {
  id: string
  name: string
  date_utc: string
  rocket: string
  success: boolean | null
  links?: {
    patch?: {
        small?: string
        large?: string
    }
  }
  upcoming: boolean
}
