/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
    domains: ['localhost', 'images.unsplash.com'],
  },
  
  // Environment variables that should be available on the client side
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  
  // Note: Security headers are handled by Netlify _headers file
  // Cannot use headers() function with output: 'export'
};

module.exports = nextConfig;
