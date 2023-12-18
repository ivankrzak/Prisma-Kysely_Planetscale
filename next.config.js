require('reflect-metadata')

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs')

const withGraphql = require('next-plugin-graphql')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    // Transform `import { map } from 'lodash'` to `import map from 'lodash/map'`
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  webpack: (config) => {
    config.module.rules = [
      ...config.module.rules,
      /**
       * Enables tree shaking of index.ts files. This is handy when the project uses index.ts as
       * barrel files for reexporting exports from other files (for instance, within a folder).
       *
       * These files shouldn't contain any side-effects.
       * https://github.com/vercel/next.js/issues/12557#issuecomment-994278512
       */
      {
        test: /index.ts/i,
        sideEffects: false,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ]
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
}

module.exports = withSentryConfig(
  withGraphql(nextConfig),
  {
    silent: true,
    dryRun: process.env.DRY_RUN === 'true' || !process.env.SENTRY_DSN,
  },
  { hideSourceMaps: false },
)
