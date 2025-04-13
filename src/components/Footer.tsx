// import Link from "./Link";

export default function Footer() {
  return (
    <footer className="border-t-1">
      <div className="mt-8 flex flex-col items-center">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Sithira Senanayake</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          {/* <Link href="/">{siteMetadata.title}</Link> */}
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          {/* <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
