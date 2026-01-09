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
    const width = window.innerWidth

    const scale = Math.min(Math.max(width / 1200, 0.7), 1.4)

    confetti({
        particleCount: Math.floor(400 * scale),
        spread: Math.floor(300 * scale),
        origin: { y: 0.75 },
    })

    addLog("🚀 We are going to Mars.")
  }

  return (
    <div className="h-screen flex flex-col">
        <header className="flex flex-col gap-4 px-6 py-4 border-b sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg sm:text-xl font-bold">
                Galactic Fleet Commander
            </h1>

            <div className="flex items-center gap-2 sm:gap-3">
                <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLogOpen((prev) => !prev)}
                >
                {isLogOpen ? "Hide Logs" : "Show Logs"}
                </Button>
                <ThemeToggle />
            </div>
        </header>


      <div className="flex flex-1">
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
            animate={{
                width: isLogOpen ? 300 : 0,
                x: isLogOpen ? 0 : 300,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
                fixed right-0 top-0 z-40 h-full
                bg-background border-l
                overflow-hidden
                md:static md:translate-x-0
            "
        >
        {isLogOpen && ( 
            <LogConsole logs={logs} onClear={() => setLogs([])} /> 
        )}
        {isLogOpen && (
        <div
            className="fixed inset-0 bg-black/20 md:hidden"
            onClick={() => setIsLogOpen(false)}
        />
        )}
        </motion.aside>
        
      </div>
    </div>
  )
}
