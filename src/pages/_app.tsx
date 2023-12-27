import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'hooks/useApollo'
import { useSetSentryUser } from 'hooks/useSetSentryUser'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { BaseAppProps, NextPageWithLayout } from 'types/next'
import { REFETCH_INTERVAL } from 'constants/common/auth'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'theme'

/*
 Uncomment for SSG
const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }
 */

type AppPropsWithLayout = AppProps<BaseAppProps> & {
  Component: NextPageWithLayout<BaseAppProps>
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const getLayout = Component.getLayout ?? ((page) => page)
  useSetSentryUser()

  return (
    <ApolloProvider client={apolloClient}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
  )
}

const AppWithAuth = (props: AppPropsWithLayout) => {
  const { pageProps } = props
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={pageProps.session} refetchInterval={REFETCH_INTERVAL}>
        <App {...props} />
      </SessionProvider>
    </ChakraProvider>
  )
}

export default AppWithAuth
