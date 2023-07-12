const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@sismo-core/sismo-connect-server", "typeorm"],
  },
  sassOptions: {
    additionalData: `@use "styles/color" as color; @use "styles/mixin" as mixin;`,
    includePaths: [path.join(__dirname, 'src')],
  },
  compiler: {
    styledComponents: true
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false, "pino-pretty": false, lokijs: false };
    
    return config;
  },
}

module.exports = nextConfig