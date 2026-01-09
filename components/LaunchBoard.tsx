"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Launch } from "@/types/launch"
import LaunchCard from "./LaunchCard"
import LogConsole from "./LogConsole"
import ThemeToggle from "./ThemeToggle"
import { Button } from "@/components/ui/button"

export default function LaunchBoard({ launches }: { launches: Launch[] }) {
  const [logs, setLogs] = useState<string[]>([])
  const [isLogOpen, setIsLogOpen] = useState(true)

  const addLog = (message: string) => {
    setLogs((prev) => [
      `${new Date().toLocaleTimeString()} — ${message}`,
      ...prev,
    ])
  }

  const launchAll = () => {
    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.75 },
    })

    addLog("🚀 We are going to Mars.")
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-xl font-bold">Galactic Fleet Commander</h1>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsLogOpen((prev) => !prev)}
          >
            {isLogOpen ? "Hide Logs" : "Show Logs"}
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-6">
            {launches.map((launch) => (
              <LaunchCard
                key={launch.id}
                launch={launch}
                addLog={addLog}
              />
            ))}
          </div>

          <div className="flex justify-end px-6 pb-6">
            <Button onClick={launchAll}>Launch All</Button>
          </div>
        </main>

        <motion.aside
          animate={{ width: isLogOpen ? 300 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="border-l overflow-hidden"
        >
          {isLogOpen && <LogConsole logs={logs} onClear={() => setLogs([])} />}
        </motion.aside>
      </div>
    </div>
  )
}
