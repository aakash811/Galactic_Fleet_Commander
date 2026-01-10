import type { Launch } from "@/types/launch"

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches"

const DUMMY_LAUNCHES: Launch[] = [
  {
    id: "dummy-1",
    name: "Falcon 9 | Starlink Group 6-42",
    flight_number: 301,
    date_utc: "2026-01-15T14:30:00.000Z",
    date_local: "2026-01-15T09:30:00-05:00",
    date_precision: "hour",
    upcoming: true,
    rocket: "5e9d0d95eda69973a809d1ec",
    success: null,
    details: "SpaceX Starlink mission deploying 23 satellites to low Earth orbit.",
    launchpad: "5e9e4502f509094188566f88",
    links: {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    cores: [
      {
        core: null,
        flight: 15,
        gridfins: true,
        legs: true,
        reused: true,
        landing_attempt: true,
        landing_success: null,
        landing_type: "ASDS",
        landpad: null,
      },
    ],
  },
  {
    id: "dummy-2",
    name: "Falcon Heavy | Europa Clipper",
    flight_number: 302,
    date_utc: "2026-01-22T18:00:00.000Z",
    date_local: "2026-01-22T13:00:00-05:00",
    date_precision: "hour",
    upcoming: true,
    rocket: "5e9d0d95eda69974db09d1ed",
    success: null,
    details: "NASA mission to explore Jupiter's moon Europa for signs of habitability.",
    launchpad: "5e9e4502f509094188566f88",
    links: {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    cores: [
      {
        core: null,
        flight: 1,
        gridfins: true,
        legs: true,
        reused: false,
        landing_attempt: true,
        landing_success: null,
        landing_type: "RTLS",
        landpad: null,
      },
    ],
  },
  {
    id: "dummy-3",
    name: "Starship | Orbital Test Flight 7",
    flight_number: 303,
    date_utc: "2026-02-01T12:00:00.000Z",
    date_local: "2026-02-01T06:00:00-06:00",
    date_precision: "day",
    upcoming: true,
    rocket: "5e9d0d96eda699382d09d1ee",
    success: null,
    details: "Seventh integrated flight test of the Starship launch system.",
    launchpad: "5e9e4502f509092b78566f87",
    links: {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    cores: [
      {
        core: null,
        flight: 1,
        gridfins: false,
        legs: false,
        reused: false,
        landing_attempt: true,
        landing_success: null,
        landing_type: "Ocean",
        landpad: null,
      },
    ],
  },
  {
    id: "dummy-4",
    name: "Falcon 9 | CRS-32",
    flight_number: 304,
    date_utc: "2026-02-10T08:15:00.000Z",
    date_local: "2026-02-10T03:15:00-05:00",
    date_precision: "hour",
    upcoming: true,
    rocket: "5e9d0d95eda69973a809d1ec",
    success: null,
    details: "32nd Commercial Resupply Services mission to the International Space Station.",
    launchpad: "5e9e4502f509094188566f88",
    links: {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    cores: [
      {
        core: null,
        flight: 8,
        gridfins: true,
        legs: true,
        reused: true,
        landing_attempt: true,
        landing_success: null,
        landing_type: "ASDS",
        landpad: null,
      },
    ],
  },
  {
    id: "dummy-5",
    name: "Falcon 9 | Transporter-12",
    flight_number: 305,
    date_utc: "2026-02-18T15:45:00.000Z",
    date_local: "2026-02-18T10:45:00-05:00",
    date_precision: "hour",
    upcoming: true,
    rocket: "5e9d0d95eda69973a809d1ec",
    success: null,
    details: "Dedicated rideshare mission carrying multiple small satellites to sun-synchronous orbit.",
    launchpad: "5e9e4501f509094ba4566f84",
    links: {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    cores: [
      {
        core: null,
        flight: 12,
        gridfins: true,
        legs: true,
        reused: true,
        landing_attempt: true,
        landing_success: null,
        landing_type: "ASDS",
        landpad: null,
      },
    ],
  },
  {
    id: "dummy-6",
    name: "Falcon 9 | Crew-10",
    flight_number: 306,
    date_utc: "2026-03-01T04:30:00.000Z",
    date_local: "2026-02-28T23:30:00-05:00",
    date_precision: "hour",
    upcoming: true,
    rocket: "5e9d0d95eda69973a809d1ec",
    success: null,
    details: "NASA Commercial Crew mission carrying astronauts to the ISS.",
    launchpad: "5e9e4502f509094188566f88",
    links: {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    cores: [
      {
        core: null,
        flight: 5,
        gridfins: true,
        legs: true,
        reused: true,
        landing_attempt: true,
        landing_success: null,
        landing_type: "ASDS",
        landpad: null,
      },
    ],
  },
  {
    id: "dummy-7",
    name: "Falcon 9 | SES O3b mPOWER 7-8",
    flight_number: 307,
    date_utc: "2026-03-12T20:00:00.000Z",
    date_local: "2026-03-12T15:00:00-05:00",
    date_precision: "hour",
    upcoming: true,
    rocket: "5e9d0d95eda69973a809d1ec",
    success: null,
    details: "Launching two O3b mPOWER satellites for SES's next-generation broadband system.",
    launchpad: "5e9e4502f509094188566f88",
    links: {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    cores: [
      {
        core: null,
        flight: 3,
        gridfins: true,
        legs: true,
        reused: true,
        landing_attempt: true,
        landing_success: null,
        landing_type: "ASDS",
        landpad: null,
      },
    ],
  },
  {
    id: "dummy-8",
    name: "Starship | Lunar Starship Demo",
    flight_number: 308,
    date_utc: "2026-04-01T00:00:00.000Z",
    date_local: "2026-03-31T19:00:00-05:00",
    date_precision: "month",
    upcoming: true,
    rocket: "5e9d0d96eda699382d09d1ee",
    success: null,
    details: "Demonstration flight of the Human Landing System variant of Starship for NASA's Artemis program.",
    launchpad: "5e9e4502f509092b78566f87",
    links: {
      patch: { small: null, large: null },
      reddit: { campaign: null, launch: null, media: null, recovery: null },
      flickr: { small: [], original: [] },
      presskit: null,
      webcast: null,
      youtube_id: null,
      article: null,
      wikipedia: null,
    },
    cores: [
      {
        core: null,
        flight: 1,
        gridfins: false,
        legs: false,
        reused: false,
        landing_attempt: true,
        landing_success: null,
        landing_type: "Ocean",
        landpad: null,
      },
    ],
  },
]

export async function fetchUpcomingLaunches(): Promise<Launch[]> {
  try {
    const response = await fetch(`${SPACEX_API_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          upcoming: true,
        },
        options: {
          limit: 8,
          sort: {
            date_utc: "asc",
          },
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.docs.length < 8) {
      const pastResponse = await fetch(`${SPACEX_API_URL}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            upcoming: false,
          },
          options: {
            limit: 8 - data.docs.length,
            sort: {
              date_utc: "desc",
            },
          },
        }),
      })

      if (pastResponse.ok) {
        const pastData = await pastResponse.json()
        return [...data.docs, ...pastData.docs].slice(0, 8)
      }
    }

    return data.docs.slice(0, 8)
  } catch (error) {
    console.error("Failed to fetch launches from SpaceX API:", error)
    return DUMMY_LAUNCHES
  }
}
