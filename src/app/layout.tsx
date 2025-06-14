import type { Metadata } from 'next'
import './globals.css'
import siteMetadata from '@/data/siteMetadata'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProviders } from './theme-providers'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { Toaster } from 'sonner'
import { GoogleAnalytics } from '@next/third-parties/google'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const basePath = process.env.BASE_PATH || ''
const gaId = process.env.GA_ID || 'G-J2KWNVV0XC'

// --- RECOMMENDED METADATA UPDATES ---
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
    locale: 'en_LK', // Changed to be more accurate for your location
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  // Added a comprehensive icons object
  icons: {
    icon: '/favicon.ico', // Make sure you have these files in your /public folder
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  // Added theme colors here
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
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
  // --- COMBINED & ENHANCED SCHEMA ---
  other: {
    'msapplication-TileColor': '#000000', // Kept this for Windows tiles
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
        // This part enables the Sitelinks Search Box in Google
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
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </head>

      <body className="mr-2 flex min-h-screen flex-col bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
        <ThemeProviders>
          <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <NavBar />
            <main className="mb-auto">{children}</main>
            <GoogleAnalytics gaId={gaId} />
            <Toaster richColors />
            <Footer />
          </section>
        </ThemeProviders>
      </body>
    </html>
  )
}
