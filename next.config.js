const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@sismo-core/sismo-connect-server"],
  },
  sassOptions: {
    additionalData: `@use "styles/color" as color; @use "styles/mixin" as mixin;`,
    includePaths: [path.join(__dirname, 'src')],
 }
}

module.exports = nextConfig