const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@use "styles/color" as color; @use "styles/mixin" as mixin;`,
    includePaths: [path.join(__dirname, 'src')],
 },
 async redirects() {
    return [
      {
        source: '/',
        destination: process.env.REDIRECTION,
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig

