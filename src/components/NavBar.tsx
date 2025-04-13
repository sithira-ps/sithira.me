'use client'

import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import MobileNavBar from "./MobileNavBar";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = () => {
  let headerClass =
    "flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10";
  if (siteMetadata.stickyNav) {
    headerClass += " sticky top-0 z-50";
  }

  const pathname = usePathname();

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="text-2xl font-semibold sm:block logo">
          <Image
            src="/images/logo.png"
            alt="Next.js logo"
            width={120}
            height={40}
            priority
          />
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:mr-6 mr-0 sm:space-x-6">
        <div className="hidden sm:flex no-scrollbar max-w-72 items-center gap-x-4 overflow-x-auto md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .map((link) => {
              const isActive = 
                link.title === 'Home' ? pathname =='/' : pathname.startsWith(`/${link.title.toLowerCase()}`
              );
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`m-1 font-medium ${
                    isActive
                      ? "text-cyan-500 dark:text-primary-400"
                      : "text-gray-900 dark:text-gray-100"
                  } hover:text-primary-500 dark:hover:text-primary-400`}
                >
                  {link.title}
                </Link>
              );
            })}
        </div>
        {/* <SearchButton /> */}
        <MobileNavBar />
      </div>
    </header>
  );
};

export default NavBar;
