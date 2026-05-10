import SocialIcon from '@/components/social-icons'
import NextImage from 'next/image'
import { genPageMetadata } from '../seo'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export const metadata = genPageMetadata({ title: 'About Sithira Senanayake' })

export default function AuthorLayout() {
  return (
    <div>
      {/* Photo, name, title, socials */}
      <div className="flex flex-col items-center text-center mb-10">
        <NextImage
          alt="sithira-senanayake-avatar"
          src="/images/sithira-senanayake-2.png"
          className="h-40 w-40 rounded-full object-cover mb-4"
          style={{ border: '2px solid var(--color-border)' }}
          width={160}
          height={160}
        />
        <h1 className="page-title mb-1">Sithira Senanayake</h1>
        <p className="text-caption">Software Engineer</p>
        <div className="mt-4 flex space-x-3">
          <SocialIcon kind="mail" href="mailto:hello@sithira.me" />
          <SocialIcon kind="github" href="https://github.com/sithira-ps" />
          <SocialIcon kind="linkedin" href="https://www.linkedin.com/in/sithira-senanayake/" />
          <SocialIcon kind="x" href="https://x.com/_Sithira" />
          <SocialIcon kind="instagram" href="http://instagram.com/__sithira/" />
        </div>
      </div>

      {/* Bio content */}
      <div className="prose max-w-none">
        <p>
          Welcome to my little corner of the internet! This is where curiosity leads the way, a
          space for thoughts, ideas, and those random musings that pop up when you least expect
          them. No rigid themes, no strict schedules, just authentic exploration of whatever
          catches my attention.
        </p>
        <p>
          My journey started with a <b>Computer Science</b> degree from the{' '}
          <Link href="https://www.sjp.ac.lk/" target="_blank">
            University of Sri Jayewardenepura <ExternalLink className="inline h-3 w-3" />
          </Link>
          , followed by my first role at{' '}
          <Link href="https://pristineworldwide.com/" target="_blank">
            Pristine Solutions <ExternalLink className="inline h-3 w-3" />
          </Link>
          . Those early days taught me the fundamentals of building software from concept to
          deployment. But the real adventure began when I made the leap to remote work with{' '}
          <Link href="https://www.aventragroup.com/" target="_blank">
            Aventra Group <ExternalLink className="inline h-3 w-3" />
          </Link>
          {', '}a Malaysian company specialized in <b>Maritime</b> industry. That decision
          completely transformed my perspective on both technology and life.
        </p>

        <p>
          What you&rsquo;ll find here is wonderfully unpredictable. One day I might reflect on a
          breakthrough moment in my coding journey, the next I could be sharing a story about
          adapting to remote work culture, or diving deep into a concept that&rsquo;s been keeping
          me up at night. It&rsquo;s this spontaneity that keeps the writing fresh and honest.
        </p>
        <p>
          I like to think of our interaction here as grabbing coffee with a friend, sometimes
          we&rsquo;ll geek out over technical discoveries, other times we&rsquo;ll laugh about the
          absurdities of daily life, and occasionally we&rsquo;ll venture into those bigger
          questions that make us human. Whatever brings you here, I hope you leave with something
          that sparks your own sense of wonder.
        </p>
      </div>
    </div>
  )
}
