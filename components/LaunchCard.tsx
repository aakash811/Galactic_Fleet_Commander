"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Rocket, AlertTriangle, CheckCircle2, Clock, Fuel, Radio, Navigation } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Launch, LaunchState } from "@/types/launch"
import { cn } from "@/lib/utils"

interface LaunchCardProps {
  launch: Launch
  state?: LaunchState
  onInitialize: () => void
  onAbort: () => void
}

function formatLaunchDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getProgressColor(progress: number): string {
  if (progress < 50) {
    return "bg-yellow-500"
  } else if (progress < 80) {
    return "bg-amber-400"
  } else {
    return "bg-green-500"
  }
}

function getRocketType(name: string): string {
  if (name.toLowerCase().includes("starship")) return "Starship"
  if (name.toLowerCase().includes("falcon heavy")) return "Falcon Heavy"
  return "Falcon 9"
}

export const LaunchCard = memo(function LaunchCard({ launch, state, onInitialize, onAbort }: LaunchCardProps) {
  const status = state?.status || "idle"
  const progress = state?.progress || 0
  const timeRemaining = state?.timeRemaining || 10
  const isInitializing = status === "initializing"
  const isReady = status === "ready"
  const isAborted = status === "aborted"

  const rocketType = getRocketType(launch.name)
  const missionName = launch.name.split("|")[1]?.trim() || launch.name

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 border-border/50",
          isInitializing && "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
          isReady && "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
          isAborted && "border-red-500/50",
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs font-mono">
                  #{launch.flight_number}
                </Badge>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    rocketType === "Starship" && "bg-purple-500/20 text-purple-300",
                    rocketType === "Falcon Heavy" && "bg-orange-500/20 text-orange-300",
                    rocketType === "Falcon 9" && "bg-blue-500/20 text-blue-300",
                  )}
                >
                  {rocketType}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground truncate" title={missionName}>
                {missionName}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatLaunchDate(launch.date_utc)}</span>
              </div>
            </div>

            <div className="shrink-0">
              {isReady && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-2 rounded-full bg-green-500/20">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </motion.div>
              )}
              {isInitializing && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="p-2 rounded-full bg-yellow-500/20"
                >
                  <Fuel className="h-5 w-5 text-yellow-500" />
                </motion.div>
              )}
              {isAborted && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-2 rounded-full bg-red-500/20">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </motion.div>
              )}
              {status === "idle" && (
                <div className="p-2 rounded-full bg-muted">
                  <Rocket className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {launch.details && <p className="text-xs text-muted-foreground line-clamp-2">{launch.details}</p>}

          {isInitializing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">System Check Progress</span>
                <span className="font-mono font-medium text-foreground">{timeRemaining.toFixed(1)}s</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    getProgressColor(progress)
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs transition-colors",
                    progress >= 25 ? "text-green-500" : "text-muted-foreground",
                  )}
                >
                  <Navigation className="h-3 w-3" />
                  <span>NAV</span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs transition-colors",
                    progress >= 50 ? "text-green-500" : "text-muted-foreground",
                  )}
                >
                  <Fuel className="h-3 w-3" />
                  <span>FUEL</span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs transition-colors",
                    progress >= 75 ? "text-green-500" : "text-muted-foreground",
                  )}
                >
                  <Radio className="h-3 w-3" />
                  <span>COMM</span>
                </div>
              </div>
            </motion.div>
          )}

          {isReady && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-green-500/10 text-green-500"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">All Systems Ready</span>
            </motion.div>
          )}

          <div className="flex gap-2">
            {!isInitializing && !isReady && (
              <Button onClick={onInitialize} className="flex-1 bg-primary hover:bg-primary/90" disabled={isAborted}>
                <Rocket className="h-4 w-4 mr-2" />
                Initialize Systems
              </Button>
            )}
            {isInitializing && (
              <Button onClick={onAbort} variant="destructive" className="flex-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Abort
              </Button>
            )}
            {isReady && (
              <Button onClick={onInitialize} className="flex-1 bg-transparent" variant="outline">
                <Rocket className="h-4 w-4 mr-2" />
                Reinitialize
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
})
