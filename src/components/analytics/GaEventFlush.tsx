'use client'

import { useEffect } from 'react'
import { flushConfirmedGaEvents } from '@/lib/track'

// Drains events the server confirmed during a redirect (sign_up,
// welcome_bonus_granted, and any spend the previous page did not flush).
export function GaEventFlush() {
  useEffect(() => {
    flushConfirmedGaEvents()
  }, [])
  return null
}
