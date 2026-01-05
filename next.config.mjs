import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Setup dev platform for local development with Cloudflare Pages
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // Removed output: 'export' for SSR support
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
