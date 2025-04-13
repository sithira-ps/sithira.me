'use client'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useRef, useState, useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement | null>(null) // explicitly typed
  const pathname = usePathname()

  useEffect(() => {
    const element = navRef.current
    if (element) {
      if (open) {
        disableBodyScroll(element)
      } else {
        enableBodyScroll(element)
      }
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="Toggle Menu" className="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="hover:text-primary-500 dark:hover:text-primary-400 h-8 w-8 text-gray-900 dark:text-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full bg-white/95 pt-8 pl-12 dark:bg-gray-950/98">
        <SheetTitle>Menu</SheetTitle>
        <nav ref={navRef} className="flex h-full flex-col items-start overflow-y-auto text-left">
          {headerNavLinks.map((link) => {
            const isActive =
              link.title === 'Home'
                ? pathname === '/'
                : pathname.startsWith(`/${link.title.toLowerCase()}`)

            return (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${
                  isActive
                    ? 'dark:text-primary-400 text-cyan-500'
                    : 'text-gray-900 dark:text-gray-100'
                } hover:text-primary-500 dark:hover:text-primary-400 mb-4 py-2 pr-4 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100`}
              >
                {link.title}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
