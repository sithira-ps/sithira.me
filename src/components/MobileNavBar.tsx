'use client'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useRef, useState, useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import Image from 'next/image'

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
          <Menu />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-3/4 bg-white pt-4 pl-4 dark:bg-gray-950">
        <SheetTitle>
          <Link href="/" onClick={() => setOpen(false)}>
            <div className="logo text-2xl font-semibold sm:block">
              <Image
                src="/images/logo-light.png"
                alt="Logo Light"
                width={120}
                height={40}
                className="block dark:hidden"
                priority
              />
              <Image
                src="/images/logo-dark.png"
                alt="Logo Dark"
                width={120}
                height={40}
                className="hidden dark:block"
                priority
              />
            </div>
          </Link>
        </SheetTitle>
        <nav
          ref={navRef}
          className="flex h-full flex-col items-start overflow-y-auto pt-4 pl-4 text-left"
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
                  isActive
                    ? 'dark:text-primary-400 text-cyan-500'
                    : 'text-gray-900 dark:text-gray-100'
                } hover:text-primary-500 dark:hover:text-primary-400 mb-2 py-2 pr-4 text-2xl font-bold tracking-widest`}
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
