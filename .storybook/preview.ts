import '../globals.css'
import type { Preview } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import ProvidersDecorator from './ProvidersDecorator'

initialize({
  onUnhandledRequest: 'bypass',
})

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator, ProvidersDecorator]

const preview: Preview = {
  parameters: {
    actions: { expanded: true },
    nextRouter: {
      Provider: RouterContext.Provider,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
