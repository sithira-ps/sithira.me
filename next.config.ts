import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer2'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default withContentlayer(nextConfig)
