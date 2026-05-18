import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TZ = 'Asia/Colombo'

export function getISTDateString(date = new Date()): string {
  return date.toLocaleDateString('en-CA', { timeZone: TZ })
}

export function getISTTimeComponents(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const h = parts.find((p) => p.type === 'hour')!.value
  const m = parts.find((p) => p.type === 'minute')!.value
  const s = parts.find((p) => p.type === 'second')!.value
  return { h, m, s }
}
