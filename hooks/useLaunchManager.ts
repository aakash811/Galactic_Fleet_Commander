"use client"

import { useState, useRef, useCallback } from "react"
import type { LaunchState, LogEntry } from "@/types/launch"

const COUNTDOWN_DURATION = 10 
const TICK_INTERVAL = 100 

interface UseLaunchManagerReturn {
  launchStates: Map<string, LaunchState>
  logs: LogEntry[]
  initializeLaunch: (id: string, name: string) => void
  abortLaunch: (id: string, name: string) => void
  launchAll: (launches: Array<{ id: string; name: string }>) => void
  clearLogs: () => void
  addLog: (message: string, type: LogEntry["type"], launchName?: string) => void
}

export function useLaunchManager(): UseLaunchManagerReturn {
  const [launchStates, setLaunchStates] = useState<Map<string, LaunchState>>(new Map())
  const [logs, setLogs] = useState<LogEntry[]>([])

  const intervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  const activeCountdownsRef = useRef<Set<string>>(new Set())

  const addLog = useCallback((message: string, type: LogEntry["type"], launchName?: string) => {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      message,
      type,
      launchName,
    }
    setLogs((prev) => [...prev, entry])
  }, [])

  const clearLogs = useCallback(() => {
    setLogs([])
  }, [])

  const updateLaunchState = useCallback((id: string, updates: Partial<LaunchState>) => {
    setLaunchStates((prev) => {
      const newMap = new Map(prev)
      const current = newMap.get(id) || { id, status: "idle", progress: 0, timeRemaining: COUNTDOWN_DURATION }
      newMap.set(id, { ...current, ...updates })
      return newMap
    })
  }, [])

  const cleanupCountdown = useCallback((id: string) => {
    const interval = intervalsRef.current.get(id)
    if (interval) {
      clearInterval(interval)
      intervalsRef.current.delete(id)
    }
    activeCountdownsRef.current.delete(id)
  }, [])

  const initializeLaunch = useCallback(
    (id: string, name: string) => {
      if (activeCountdownsRef.current.has(id)) {
        addLog(`${name}: Systems already initializing - command ignored`, "warning", name)
        return
      }

      cleanupCountdown(id)

      activeCountdownsRef.current.add(id)

      updateLaunchState(id, {
        status: "initializing",
        progress: 0,
        timeRemaining: COUNTDOWN_DURATION,
      })

      addLog(`${name}: Fueling started`, "info", name)
      addLog(`${name}: Running pre-flight system checks...`, "info", name)

      let elapsed = 0
      const totalTicks = (COUNTDOWN_DURATION * 1000) / TICK_INTERVAL

      const interval = setInterval(() => {
        elapsed += TICK_INTERVAL

        if (!activeCountdownsRef.current.has(id)) {
          clearInterval(interval)
          return
        }

        const progress = Math.min((elapsed / (COUNTDOWN_DURATION * 1000)) * 100, 100)
        const timeRemaining = Math.max(COUNTDOWN_DURATION - elapsed / 1000, 0)

        updateLaunchState(id, {
          progress,
          timeRemaining,
        })

        if (Math.floor(elapsed / TICK_INTERVAL) === Math.floor(totalTicks * 0.25)) {
          addLog(`${name}: Navigation systems online`, "info", name)
        } else if (Math.floor(elapsed / TICK_INTERVAL) === Math.floor(totalTicks * 0.5)) {
          addLog(`${name}: Propulsion check complete`, "info", name)
        } else if (Math.floor(elapsed / TICK_INTERVAL) === Math.floor(totalTicks * 0.75)) {
          addLog(`${name}: Communication systems verified`, "info", name)
        }

        if (elapsed >= COUNTDOWN_DURATION * 1000) {
          cleanupCountdown(id)
          updateLaunchState(id, {
            status: "ready",
            progress: 100,
            timeRemaining: 0,
          })
          addLog(`${name}: ✓ All systems ready for launch!`, "success", name)
        }
      }, TICK_INTERVAL)

      intervalsRef.current.set(id, interval)
    },
    [addLog, cleanupCountdown, updateLaunchState],
  )

  const abortLaunch = useCallback(
    (id: string, name: string) => {
      cleanupCountdown(id)

      updateLaunchState(id, {
        status: "aborted",
        progress: 0,
        timeRemaining: COUNTDOWN_DURATION,
      })

      addLog(`${name}: ⚠ ABORT SEQUENCE INITIATED`, "error", name)
      addLog(`${name}: Systems shutdown complete`, "warning", name)

      setTimeout(() => {
        updateLaunchState(id, {
          status: "idle",
          progress: 0,
          timeRemaining: COUNTDOWN_DURATION,
        })
      }, 1500)
    },
    [addLog, cleanupCountdown, updateLaunchState],
  )

  const launchAll = useCallback(
    (launches: Array<{ id: string; name: string }>) => {
      addLog("🚀 INITIATING LAUNCH SEQUENCE FOR ALL MISSIONS", "system")
      addLog("We are going to Mars.", "system")

      launches.forEach((launch, index) => {
        setTimeout(() => {
          initializeLaunch(launch.id, launch.name)
        }, index * 300)
      })
    },
    [addLog, initializeLaunch],
  )

  return {
    launchStates,
    logs,
    initializeLaunch,
    abortLaunch,
    launchAll,
    clearLogs,
    addLog,
  }
}
