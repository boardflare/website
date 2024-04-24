/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

module.exports = withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  // webpack: (config) => {  // This is a workaround for the sharp and onnxruntime-node issues
  //   // See https://webpack.js.org/configuration/resolve/#resolvealias
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "sharp$": false,
  //     "onnxruntime-node$": false,
  //   }
  //   return config;
  // },
})

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })