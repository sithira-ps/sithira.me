// src/app/about/page.ts

import SocialIcon from '@/components/social-icons'
import NextImage from 'next/image'
import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'About Sithira Senanayake' })

export default function AuthorLayout() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
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
              Welcome to my little corner of the internet! This blog is a space where I share my
              thoughts, ideas, and random musings on anything that sparks my interest. From everyday
              observations to deep dives into things I’m passionate about, you’ll find a mix of
              topics that keep me curious.
            </p>
            <p>
              Writing here feels like a creative outlet where I can let my mind wander freely.
              There’s no strict agenda—just a place to let thoughts flow and see where they go. Some
              days you might find me reflecting on something I’ve learned, other times I’ll be
              sharing a quirky observation or an interesting discovery.
            </p>

            <p>
              I hope this space feels like a friendly chat over coffee, where we can share ideas,
              laugh, or even dive into a topic that’s been on my mind. There’s no agenda here—just
              stories, experiences, and thoughts that come and go. Thanks for stopping by, and I
              hope you find something here that resonates with you!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
