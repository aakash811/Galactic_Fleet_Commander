import { fetchUpcomingLaunches } from "@/lib/spacex"
import {LaunchBoard} from "@/components/LaunchBoard"

export default async function Home() {
  const launches = await fetchUpcomingLaunches()
  return <LaunchBoard initialLaunches={launches} />
}
