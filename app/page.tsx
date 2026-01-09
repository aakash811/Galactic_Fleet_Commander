import { getLaunches } from "@/lib/spacex"
import LaunchBoard from "@/components/LaunchBoard"

export default async function Home() {
  const launches = await getLaunches()
  return <LaunchBoard launches={launches} />
}
