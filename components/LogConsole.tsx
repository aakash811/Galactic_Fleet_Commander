"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function LogConsole({
  logs,
  onClear,
}: {
  logs: string[]
  onClear: () => void
}) {
  return (
    <motion.aside
      initial={{ x: 320 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-80 border-l bg-background p-4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-wide">
          Mission Logs
        </h2>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={logs.length === 0}
          className="mr-3 text-xs text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          Clear Logs
        </Button>
      </div>

      <ScrollArea className="flex-1 pr-2">
        {logs.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Awaiting launch activity…
          </p>
        ) : (
          <div className="space-y-2">
            {logs.map((log, idx) => (
              <p
                key={log + idx}
                className="
                  text-xs font-mono leading-relaxed
                  text-foreground/90
                "
              >
                {log}
              </p>
            ))}
          </div>
        )}
      </ScrollArea>
    </motion.aside>
  )
}
