// 'use client'

// import { Comments as CommentsComponent } from 'pliny/comments/index.js'
// import { useState } from 'react'
// import siteMetadata from '@/data/siteMetadata'

// export default function Comments({ slug }: { slug: string }) {
//   const [loadComments, setLoadComments] = useState(false)

//   if (!siteMetadata.comments?.provider) {
//     return null
//   }
//   return (
//     <>
//       {loadComments ? (
//         <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
//       ) : (
//         <button className='hidden' onClick={() => setLoadComments(true)}>Load Comments</button>
//       )}
//     </>
//   )
// }


// src/components/Comments.tsx
'use client'; // This component will be a client component

import React from 'react';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

const Comments = () => {
  const { theme } = useTheme();

  return (
    <div className="mt-8">
      <Giscus
        id="comments"
        repo="sithira-ps/sithira.me"
        repoId="R_kgDOOYiq0A"
        category="Comments" // Replace with your category
        categoryId="DIC_kwDOOYiq0M4Croy6" // Replace with your category ID
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  )
};

export default Comments;