'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNavBar from './MobileNavBar'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-4'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  const pathname = usePathname()

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
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
      <div className="mr-0 flex items-center space-x-4 leading-5 sm:mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-72 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks.map((link) => {
            const isActive =
              link.title === 'Home'
                ? pathname == '/'
                : pathname.startsWith(`/${link.title.toLowerCase()}`)
            return (
              <Link
                key={link.title}
                href={link.href}
                className={`m-1 font-medium ${
                  isActive
                    ? 'dark:text-primary-400 text-cyan-500'
                    : 'text-gray-900 dark:text-gray-100'
                } hover:text-primary-500 dark:hover:text-primary-400`}
              >
                {link.title}
              </Link>
            )
          })}
        </div>
        {/* <SearchButton /> */}
        <MobileNavBar />
      </div>
    </header>
  )
}

export default NavBar
