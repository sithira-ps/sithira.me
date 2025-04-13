import SocialIcon from "@/components/social-icons";
import NextImage from "next/image";

export default function AuthorLayout() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            <NextImage
              alt="avatar"
              src="/images/avatar.png"
              className="h-48 w-48 rounded-full"
              width={192}
              height={192}
            />
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">
              Sithira Senanayake
            </h3>
            <div className="text-gray-500 dark:text-gray-400">
              Software Engineer
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Aventra Group Pvt Ltd
            </div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon
                kind="mail"
                href={`mailto:sithirasenanayake@gmail.com`}
              />
              <SocialIcon kind="github" href="as" />
              <SocialIcon kind="linkedin" href="sd" />
              <SocialIcon kind="x" href="sd" />
              <SocialIcon kind="bluesky" href="s" />
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            <p>
              Tails Azimuth is a professor of atmospheric sciences at the
              Stanford AI Lab. His research interests includes complexity
              modelling of tailwinds, headwinds and crosswinds.
            </p>
            <br></br>
            <p>
              He leads the clean energy group which develops 3D air
              pollution-climate models, writes differential equation solvers,
              and manufactures titanium plated air ballons. In his free time he
              bakes raspberry pi.
            </p>
            <br></br>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque
              elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin
              eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet.
              Duis dapibus diam vel metus tempus vulputate.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
