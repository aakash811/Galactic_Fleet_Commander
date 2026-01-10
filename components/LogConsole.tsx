"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { LogEntry } from "@/types/launch"
import { cn } from "@/lib/utils"

interface LogConsoleProps {
  logs: LogEntry[]
  onClear: () => void
  isOpen: boolean
  onClose: () => void
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

function getLogTypeStyles(type: LogEntry["type"]): string {
  switch (type) {
    case "success":
      return "text-green-400"
    case "error":
      return "text-red-400"
    case "warning":
      return "text-yellow-400"
    case "system":
      return "text-purple-400 font-semibold"
    default:
      return "text-blue-400"
  }
}

export function LogConsole({ logs, onClear, isOpen, onClose }: LogConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card border-l border-border shadow-2xl z-50 flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Mission Control Log</h2>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{logs.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={onClear} className="h-8 w-8" title="Clear logs">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1" ref={scrollRef}>
            <div className="p-4 space-y-1 font-mono text-xs">
              <AnimatePresence initial={false}>
                {logs.length === 0 ? (
                  <div className="text-muted-foreground text-center py-8">
                    No logs yet. Initialize a launch to see activity.
                  </div>
                ) : (
                  logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2 py-1 hover:bg-muted/50 px-2 -mx-2 rounded"
                    >
                      <span className="text-muted-foreground flex-shrink-0">[{formatTime(log.timestamp)}]</span>
                      <span className={cn(getLogTypeStyles(log.type))}>{log.message}</span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          <div className="px-4 py-2 border-t border-border bg-muted/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Connected to Mission Control</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
