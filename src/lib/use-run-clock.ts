'use client'

import { useEffect, useState } from 'react'

// Restarts whenever runId changes, including when a new upload begins while
// the previous run was still on screen (phase stays "analyzing", so a
// phase-only effect would keep the old clock).
export function useRunClock(active: boolean, runId: number): number {
  const [elapsedSec, setElapsedSec] = useState(0)

  useEffect(() => {
    if (!active) {
      setElapsedSec(0)
      return
    }
    const started = Date.now()
    setElapsedSec(0)
    const tick = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - started) / 1000))
    }, 250)
    return () => clearInterval(tick)
  }, [active, runId])

  return elapsedSec
}
