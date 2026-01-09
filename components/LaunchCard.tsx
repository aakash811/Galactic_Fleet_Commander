"use client"

import { useEffect, useRef } from "react"
import { Launch } from "@/types/launch"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLaunchManager } from "@/hooks/useLaunchManager"

export default function LaunchCard({
  launch,
  addLog,
}: {
  launch: Launch
  addLog: (msg: string) => void
}) {
  const { start, abort, progress, running } = useLaunchManager()

  const milestonesRef = useRef<Set<number>>(new Set())
  const lastProgressRef = useRef(0)

  const barColor = "bg-gradient-to-r from-yellow-400 via-lime-400 to-green-500"

  useEffect(() => {
    const milestones = [
      { percent: 30, message: "Calculating trajectory." },
      { percent: 60, message: "Navigation systems calibrated." },
      { percent: 90, message: "Final system checks." },
    ]

    milestones.forEach(({ percent, message }) => {
      if (
        lastProgressRef.current < percent &&
        progress >= percent
      ) {
        addLog(`${launch.name}: ${message}`)
      }
    })

    lastProgressRef.current = progress
  }, [progress, addLog, launch.name])

  const handleStart = () => {
    milestonesRef.current.clear()
    lastProgressRef.current = 0

    addLog(`${launch.name}: Fueling started`)

    start(() => {
      addLog(`${launch.name}: Systems Ready`)
    })
  }

  const handleAbort = () => {
    milestonesRef.current.clear()
    lastProgressRef.current = 0

    addLog(`${launch.name}: Launch aborted`)
    abort()
  }


  return (
    <Card
      className={`group w-auto overflow-hidden rounded-xl border shadow-sm transition-all duration-300 ${running ? "ring-2 ring-primary/50 scale-[1.02]" : "hover:shadow-lg"}
      `}
    >
      <div className="relative h-56 bg-muted flex items-center justify-center">
        {launch.links?.patch?.small && (
          <img
            src={launch.links.patch.small}
            alt={`${launch.name} mission patch`}
            className={`
              h-40 w-40 object-cover
              transition-opacity duration-300
              ${running ? "opacity-100" : "opacity-10 group-hover:opacity-100"}
            `}
          />
        )}

        <div className="absolute left-4 top-4 z-10">
          <h3 className="text-xl font-semibold tracking-tight">
            {launch.name}
          </h3>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Upcoming launch
          </p>
        </div>

        {running && (
          <span className="absolute right-4 top-4 z-10 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
        )}
      </div>

      <CardContent className="space-y-6 pt-5">
        {(running || progress > 0) && (
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${running ? "animate-pulse" : ""} ${barColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={handleStart}
            disabled={running}
            className="flex-1"
          >
            Initialize Systems
          </Button>

          <Button
            variant="destructive"
            onClick={handleAbort}
            disabled={!running}
            className="flex-1"
          >
            Abort
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
