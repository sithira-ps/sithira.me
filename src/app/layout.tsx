import type { Metadata, Viewport } from 'next'
import './globals.css'
import siteMetadata from '@/data/siteMetadata'
import { Source_Serif_4, Space_Grotesk, Caveat } from 'next/font/google'
import { ThemeProviders } from './theme-providers'
import Sidebar from '@/components/Sidebar'
import { GoogleAnalytics } from '@next/third-parties/google'
import Link from 'next/link'
import NavLinks from '@/components/NavLinks'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'
import ClientToaster from '@/components/ClientToaster'

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

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  weight: '700',
  variable: '--font-caveat',
  preload: false,
})

const basePath = process.env.BASE_PATH || ''
const gaId = process.env.NEXT_PUBLIC_GA_ID || process.env.GA_ID

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
        '@id': 'https://sithira.me/#person',
        name: 'Sithira Senanayake',
        url: 'https://sithira.me',
        image: {
          '@type': 'ImageObject',
          url: 'https://sithira.me/images/sithira-senanayake-2.png',
          width: 400,
          height: 400,
        },
        sameAs: [
          'https://github.com/sithira-ps',
          'https://www.linkedin.com/in/sithira-senanayake/',
          'https://x.com/_Sithira',
          'https://instagram.com/__sithira/',
          'https://medium.com/@sithirasenanayake',
        ],
        jobTitle: 'Software Engineer',
        nationality: { '@type': 'Country', name: 'Sri Lanka' },
        knowsAbout: [
          'Software Engineering',
          'Next.js',
          'React',
          'Flutter',
          'Angular',
          'TypeScript',
          'Node.js',
          'Docker',
          'Cloud Computing',
          'Artificial Intelligence',
          'Philosophy',
          'Science',
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'University of Sri Jayewardenepura',
          url: 'https://www.sjp.ac.lk/',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Aventra Group',
          url: 'https://www.aventragroup.com/',
        },
        description:
          'Software Engineer specializing in web and mobile development. Writes about technology, software engineering, science, and philosophy.',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sithira.me/#website',
        url: 'https://sithira.me',
        name: 'Sithira Senanayake - Personal Blog',
        description: 'Personal blog about software engineering, technology, science, and philosophy by Sithira Senanayake.',
        publisher: { '@id': 'https://sithira.me/#person' },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://sithira.me/blog?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return (
    <html
      lang={siteMetadata.language}
      className={`${sourceSerif.variable} ${space_grotesk.variable} ${caveat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body>
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-[100] -translate-y-16 rounded bg-[var(--color-accent)] px-4 py-2 text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
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
                    className="active flex items-center gap-1 no-underline"
                    style={{
                      textDecoration: 'none',
                      fontFamily: 'var(--font-caveat)',
                      fontSize: '2.0rem',
                      fontWeight: 700,
                      color: 'var(--color-header)',
                    }}
                  >
                    sithira<span className="text-[var(--color-accent)]">.me</span>
                  </Link>
                </h1>
                <div className="flex items-center gap-5">
                  <NavLinks />
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Main content area */}
            <main id="main-content" className="Wrapper__main">
              <div className="Content">{children}</div>
              <Footer />
            </main>

            {/* Sidebar */}
            <Sidebar />
          </div>

          {gaId && <GoogleAnalytics gaId={gaId} />}
          <ClientToaster />
        </ThemeProviders>
      </body>
    </html>
  )
}
