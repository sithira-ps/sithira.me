// import Link from "./Link";
'use client'

import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Footer() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <footer className="border-t-1 border-t-gray-300 dark:border-t-gray-800">
      <div className="py-4 flex flex-col items-center">
        <div className="mb-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Sithira Senanayake</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <p className="mx-2">|</p>
          {theme === 'dark' ? (
            <Button variant="ghost" onClick={() => setTheme('light')}>
              <Sun className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setTheme('dark')}>
              <Moon className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </footer>
  )
}
