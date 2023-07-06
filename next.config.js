const path = require('path');


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@sismo-core/sismo-connect-server"],
  },

  sassOptions: {
    additionalData: `@use "styles/color" as color; @use "styles/mixin" as mixin;`,
    includePaths: [path.join(__dirname, 'src')],
 },
 compiler: {
  styledComponents: true
}
//  redirects: async () => {
//   return [
//     {
//       source: "/the-merge-contributors",
//       destination: "/space/the-merge-contributors",
//       permanent: true
//     },
//   ]
// }
}

module.exports = nextConfig