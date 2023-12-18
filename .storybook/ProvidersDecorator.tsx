import i18n from './i18next'
import { I18nextProvider } from 'react-i18next'
import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../src/hooks/useApollo'

export const ApolloProviderMock = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const client = useApollo(
    {},
    {
      host: process.env.GRAPHQL_API_HOST ?? 'http://localhost:3000',
    },
  )
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default (storyFn: () => JSX.Element) => (
  <ApolloProviderMock>
    <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
  </ApolloProviderMock>
)
