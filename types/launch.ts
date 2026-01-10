export interface Launch {
  id: string
  name: string
  flight_number: number
  date_utc: string
  date_local: string
  date_precision: string
  upcoming: boolean
  rocket: string
  success: boolean | null
  details: string | null
  launchpad: string
  links: {
    patch: {
      small: string | null
      large: string | null
    }
    reddit: {
      campaign: string | null
      launch: string | null
      media: string | null
      recovery: string | null
    }
    flickr: {
      small: string[]
      original: string[]
    }
    presskit: string | null
    webcast: string | null
    youtube_id: string | null
    article: string | null
    wikipedia: string | null
  }
  cores: Array<{
    core: string | null
    flight: number | null
    gridfins: boolean | null
    legs: boolean | null
    reused: boolean | null
    landing_attempt: boolean | null
    landing_success: boolean | null
    landing_type: string | null
    landpad: string | null
  }>
}

export type LaunchStatus = "idle" | "initializing" | "ready" | "aborted"

export interface LaunchState {
  id: string
  status: LaunchStatus
  progress: number 
  timeRemaining: number 
}

export interface LogEntry {
  id: string
  timestamp: Date
  message: string
  type: "info" | "warning" | "success" | "error" | "system"
  launchName?: string
}
