import type { Metadata } from 'next'
import './globals.css'
import siteMetadata from '@/data/siteMetadata'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProviders } from './theme-providers'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Toaster } from 'sonner'
import Analytics from '@/components/Analytics'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const basePath = process.env.BASE_PATH || ''

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <Analytics />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </head>
      <body className="mr-2 flex min-h-screen flex-col bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <NavBar />
            <main className="mb-auto">{children}</main>
            <Toaster richColors />
            <Footer />
          </section>
        </ThemeProviders>
      </body>
    </html>
  )
}
