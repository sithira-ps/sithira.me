import type { Metadata, Viewport } from 'next'
import './globals.css'
import siteMetadata from '@/data/siteMetadata'
import { Source_Serif_4 } from 'next/font/google'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProviders } from './theme-providers'
import Sidebar from '@/components/Sidebar'
import { Toaster } from 'sonner'
import { GoogleAnalytics } from '@next/third-parties/google'
import Link from 'next/link'
import NavLinks from '@/components/NavLinks'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
})

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const basePath = process.env.BASE_PATH || ''
const gaId = process.env.GA_ID || 'G-J2KWNVV0XC'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#121008' },
  ],
}

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
    locale: 'en_LK',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Sithira Senanayake',
        url: 'https://sithira.me',
        image: 'https://sithira.me/images/sithira-senanayake-2.png',
        sameAs: [
          'https://github.com/SthiraPs',
          'https://www.linkedin.com/in/sithira-senanayake/',
          'https://x.com/_Sithira',
          'http://instagram.com/__sithira/',
        ],
        jobTitle: 'Software Engineer',
        nationality: 'Sri Lankan',
        knowsAbout: ['Technology', 'Software Engineering', 'Science', 'Philosophy'],
      },
      {
        '@type': 'WebSite',
        url: 'https://sithira.me',
        name: 'Sithira Senanayake - Personal Blog',
        publisher: {
          '@type': 'Person',
          name: 'Sithira Senanayake',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://sithira.me/blog?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <html
      lang={siteMetadata.language}
      className={`${sourceSerif.variable} ${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </head>

      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
        <ThemeProviders>
          {/* Wrapper — CSS Grid two-column layout */}
          <div className="Wrapper">
            {/* Header with top accent border */}
            <header className="Wrapper__header">
              <div className="flex items-center justify-between">
                <h1>
                  <Link
                    href="/"
                    className="section-title flex items-center gap-2 no-underline active" 
                    style={{ textDecoration: 'none' }}
                  >
                    sithira.me
                  </Link>
                </h1>
                <div className="flex items-center gap-5">
                  <NavLinks />
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Main content area */}
            <main className="Wrapper__main">
              <div className="Content">{children}</div>
              <Footer />
            </main>

            {/* Sidebar */}
            <Sidebar />
          </div>

          <GoogleAnalytics gaId={gaId} />
          <Toaster richColors />
        </ThemeProviders>
      </body>
    </html>
  )
}
