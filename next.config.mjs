import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  latex: true,
  defaultShowCopyCode: true
  // ... your Nextra config
})

export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  }
  // ... your Next.js config
})