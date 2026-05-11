'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import { components } from './MDXComponents'

interface NoteContentProps {
  code: string
}

export default function NoteContent({ code }: NoteContentProps) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={components} />
}
