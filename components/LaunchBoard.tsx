"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Rocket, Terminal, Moon, Sun, Sparkles, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LaunchCard } from "@/components/LaunchCard"
import { LogConsole } from "@/components/LogConsole"
import { useLaunchManager } from "@/hooks/useLaunchManager"
import { fetchUpcomingLaunches } from "@/lib/spacex"
import type { Launch } from "@/types/launch"
import { cn } from "@/lib/utils"

interface LaunchBoardProps {
  initialLaunches: Launch[]
}

export function LaunchBoard({ initialLaunches }: LaunchBoardProps) {
  const [launches, setLaunches] = useState<Launch[]>(initialLaunches)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  const { launchStates, logs, initializeLaunch, abortLaunch, launchAll, clearLogs, addLog } = useLaunchManager()

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newValue = !prev
      document.documentElement.classList.toggle("dark", newValue)
      return newValue
    })
  }, [])

  const refreshLaunches = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchUpcomingLaunches()
      setLaunches(data)
      addLog("Mission database refreshed successfully", "success")
    } catch (err) {
      setError("Failed to fetch launches")
      addLog("Failed to refresh mission database", "error")
    } finally {
      setIsLoading(false)
    }
  }, [addLog])

  const handleLaunchAll = useCallback(() => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#22c55e", "#3b82f6", "#a855f7", "#f97316"],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#22c55e", "#3b82f6", "#a855f7", "#f97316"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    setIsLogOpen(true)

    launchAll(launches.map((l) => ({ id: l.id, name: l.name.split("|")[1]?.trim() || l.name })))
  }, [launches, launchAll])

  return (
    <div className={cn("min-h-screen bg-background transition-colors duration-300", isDark ? "dark" : "")}>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
              >
                <Rocket className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Galactic Fleet Commander</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Mission Control Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={refreshLaunches} disabled={isLoading}>
                <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {isDark ? "Light" : "Dark"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsLogOpen(true)} className="relative">
                <Terminal className="h-4 w-4 mr-2" />
                Logs
                {logs.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {logs.length > 99 ? "99+" : logs.length}
                  </span>
                )}
              </Button>
              <Button
                onClick={handleLaunchAll}
                className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Launch All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3"
          >
            <AlertCircle className="h-5 w-5 text-destructive" />
            <span className="text-destructive">{error}</span>
            <Button variant="ghost" size="sm" onClick={refreshLaunches}>
              Retry
            </Button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {launches.map((launch, index) => (
            <motion.div
              key={launch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <LaunchCard
                launch={launch}
                state={launchStates.get(launch.id)}
                onInitialize={() => initializeLaunch(launch.id, launch.name.split("|")[1]?.trim() || launch.name)}
                onAbort={() => abortLaunch(launch.id, launch.name.split("|")[1]?.trim() || launch.name)}
              />
            </motion.div>
          ))}
        </div>

        {launches.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Rocket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Launches Found</h3>
            <p className="text-muted-foreground mb-4">Unable to retrieve launch data from SpaceX API</p>
            <Button onClick={refreshLaunches}>Try Again</Button>
          </div>
        )}
      </main>

      <LogConsole logs={logs} onClear={clearLogs} isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />

      {isLogOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLogOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 sm:hidden"
        />
      )}
    </div>
  )
}
