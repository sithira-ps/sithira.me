'use client'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useRef, useState, useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
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
        <button aria-label="Toggle Menu" className="sm:hidden text-[--color-text-body]">
          <Menu />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-3/4 bg-[--color-bg-dark] border-r border-gray-800 pt-4 pl-4">
        <SheetTitle>
          <Link href="/" onClick={() => setOpen(false)}>
            <span className="font-sans text-lg font-medium text-[--color-accent]">sithira.me</span>
          </Link>
        </SheetTitle>
        <nav
          ref={navRef}
          className="flex h-full flex-col items-start overflow-y-auto pt-8 pl-4 text-left"
        >
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
                  isActive ? 'text-[--color-accent]' : 'text-[--color-text-body]'
                } hover:text-[--color-accent] mb-2 py-2 pr-4 text-xl font-bold tracking-wide transition-colors`}
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
