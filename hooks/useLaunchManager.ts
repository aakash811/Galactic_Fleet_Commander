import { time } from "console"
import { useEffect, useRef, useState } from "react"

const COUNTDOWN_SECONDS = 10

export function useLaunchManager() {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)

  const start = (onComplete?: () => void) => {
    if (running) return 

    setRunning(true)
    let elapsed = 0

    timerRef.current = setInterval(() => {
      elapsed ++
      setProgress((elapsed / COUNTDOWN_SECONDS) * 100)
      
      if (elapsed >= COUNTDOWN_SECONDS) {
        clearInterval(timerRef.current!)
        timerRef.current = null
        setRunning(false)
        onComplete?.()
      }
    }, 1000)
  }

  const abort = () => {
    if(timerRef.current){
        clearInterval(timerRef.current!)
        timerRef.current = null
    }

    setProgress(0)
    setRunning(false)
  }

  useEffect(() => {
    return () => {
        if(timerRef.current){
            clearInterval(timerRef.current!)
        }
    }
  }, []);

  return { start, abort, progress, running }
}
