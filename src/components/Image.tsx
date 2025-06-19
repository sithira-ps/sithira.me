import { cn } from '@/lib/utils'
import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage className={cn('rounded-lg')}  src={`${basePath || ''}${src}`} {...rest} />
)

export default Image
