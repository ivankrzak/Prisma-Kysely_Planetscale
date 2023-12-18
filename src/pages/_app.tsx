import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'hooks/useApollo'
import { useSetSentryUser } from 'hooks/useSetSentryUser'
import type { AppProps } from 'next/app'
import { Outfit } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { BaseAppProps, NextPageWithLayout } from 'types/next'
import { REFETCH_INTERVAL } from 'constants/common/auth'
import { Toaster } from 'components/ui/toaster'
import '../../globals.css'

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

const AppWithI18n = appWithTranslation(App)

const outfit = Outfit({ subsets: ['latin'] })

const AppWithAuth = (props: AppPropsWithLayout) => {
  const { pageProps } = props
  return (
    <main className={outfit.className}>
      <SessionProvider session={pageProps.session} refetchInterval={REFETCH_INTERVAL}>
        <AppWithI18n {...props} />
        <Toaster />
      </SessionProvider>
    </main>
  )
}

export default AppWithAuth
