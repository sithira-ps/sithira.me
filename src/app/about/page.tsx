// src/app/about/page.ts

import SocialIcon from '@/components/social-icons'
import NextImage from 'next/image'
import { genPageMetadata } from '../seo'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export const metadata = genPageMetadata({ title: 'About Sithira Senanayake' })

export default function AuthorLayout() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-2xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14 dark:text-gray-100">
            About Sithira Senanayake
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-8">
            <NextImage
              alt="sithira-senanayake-avatar"
              src="/images/sithira-senanayake-2.png"
              className="h-48 w-48 rounded-full object-cover"
              width={192}
              height={292}
            />
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">
              Sithira Senanayake
            </h3>
            <div className="text-gray-500 dark:text-gray-400">Software Engineer</div>
            {/* <div className="text-gray-500 dark:text-gray-400">
              Aventra Group Pvt Ltd
            </div> */}
            <div className="mt-6 flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:hello@sithira.me`} />
              <SocialIcon kind="github" href="https://github.com/SthiraPs" />
              <SocialIcon kind="linkedin" href="https://www.linkedin.com/in/sithira-senanayake/" />
              <SocialIcon kind="x" href="https://x.com/_Sithira" />
              <SocialIcon kind="instagram" href="http://instagram.com/__sithira/" />
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            <p>
              Welcome to my little corner of the internet! This is where curiosity leads the way, a
              space for thoughts, ideas, and those random musings that pop up when you least expect
              them. No rigid themes, no strict schedules, just authentic exploration of whatever
              catches my attention.
            </p>
            <p>
              My journey started with a <b>Computer Science</b> degree from the{' '}
              <Link href="https://www.sjp.ac.lk/" target="black" className="no-underline">
                <span className="text-primary-500">
                  University of Sri Jayewardenepura <ExternalLink className="inline h-3 w-3" />
                </span>
              </Link>
              , followed by my first role at{' '}
              <Link href="https://pristineworldwide.com/" target="black" className="no-underline">
                <span className="text-primary-500">
                  Pristine Solutions <ExternalLink className="inline h-3 w-3" />
                </span>
              </Link>
              . Those early days taught me the fundamentals of building software from concept to
              deployment. But the real adventure began when I made the leap to remote work with{' '}
              <Link href="https://www.aventragroup.com/" target="black" className="no-underline">
                <span className="text-primary-500">
                  Aventra Group <ExternalLink className="inline h-3 w-3" />
                </span>
              </Link>
              {', '}a Malaysian company specialized in <b>Maritime</b> industry. That decision
              completely transformed my perspective on both technology and life.
            </p>

            <p>
              What you'll find here is wonderfully unpredictable. One day I might reflect on a
              breakthrough moment in my coding journey, the next I could be sharing a story about
              adapting to remote work culture, or diving deep into a concept that's been keeping me
              up at night. It's this spontaneity that keeps the writing fresh and honest.
            </p>
            <p>
              I like to think of our interaction here as grabbing coffee with a friend, sometimes
              we'll geek out over technical discoveries, other times we'll laugh about the
              absurdities of daily life, and occasionally we'll venture into those bigger questions
              that make us human. Whatever brings you here, I hope you leave with something that
              sparks your own sense of wonder.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
