/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds:true
    },
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          port: '',
        },
        {
            protocol:'https',
            hostname:'lh3.googleusercontent.com'
        }
      ],
  }
}
