import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-primary-100 border-1 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-xs rounded-sm p-1 px-2 hover:border-primary-600 ounded-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
