import graphql from '@rollup/plugin-graphql'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // @ts-expect-error
  plugins: [tsconfigPaths(), graphql()],
  test: {
    setupFiles: ['vitestSetup.ts'],
  },
})
