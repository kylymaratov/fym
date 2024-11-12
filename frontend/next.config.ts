import type { NextConfig } from 'next';
import * as path from 'path';

const nextConfig: NextConfig = {
  webpack: (config: any) => {
    config.resolve.alias['@styles'] = path.join(__dirname, 'src/styles');
    return config;
  },
  images: {},
};

export default nextConfig;
