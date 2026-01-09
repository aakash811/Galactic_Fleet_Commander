import { Launch } from "@/types/launch"

export async function getLaunches(): Promise<Launch[]> {
  const res = await fetch("https://api.spacexdata.com/v4/launches", {
    cache: "no-store",
  })
  const data = await res.json()
  return data.slice(0, 8)
}
