import type { NextConfig } from "next";
const { withContentlayer } = require('next-contentlayer2')


const nextConfig: NextConfig = {};

export default withContentlayer(nextConfig);
