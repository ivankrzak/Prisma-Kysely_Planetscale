import { ApolloClient, ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { merge } from 'lodash'
import { ToastFn } from 'components/ui/use-toast'
import { createInMemoryCache } from 'utils/app/createInMemoryCache'

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined

const IS_BROWSER = typeof window !== 'undefined'

export type Config = { host: string }

function createClientLink({ config, toast }: { config?: Config; toast: ToastFn }) {
  const host = config?.host ? config.host : ''
  const httpLink = new HttpLink({
    uri: `${host}/api/graphql`,
    credentials: 'same-origin',
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      toast({
        title: networkError.message,
        variant: 'destructive',
      })
    }
    if (graphQLErrors) {
      graphQLErrors.forEach((graphQLError) => {
        toast({
          title: graphQLError.message,
          variant: 'destructive',
        })
      })
    }
  })
  return ApolloLink.from([errorLink, httpLink])
}

function createApolloClient({ link }: { link?: ApolloLink }) {
  return new ApolloClient({
    ssrMode: !IS_BROWSER,
    link,
    cache: createInMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })
}

/**
 * Creates a client side Apollo client which can be hydrated. The original example no longer works
 * (using 'require' on local modules returns a promise) and thus the client-side and server-side
 * clients have been split.
 * @param initialState Initial state from SSG/SSR to hydrate the client with.
 * @param config Optional configuration for Apollo client
 * @returns A client side Apollo client instance.
 */
export function initializeApolloClient({
  initialState,
  config,
  toast,
}: {
  initialState?: NormalizedCacheObject
  config?: Config
  toast: ToastFn
}) {
  const link = createClientLink({ config, toast })
  const createClient = () => createApolloClient({ link })
  const apolloClient = !IS_BROWSER ? createClient() : globalApolloClient ?? createClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    let mergedCache = initialState

    if (globalApolloClient) {
      // Get existing cache, loaded during client side data fetching
      const existingCache = apolloClient.extract()

      // Merge the existing cache into data passed from getStaticProps/getServerSideProps
      mergedCache = merge({}, initialState, existingCache)
    }

    apolloClient.cache.restore(mergedCache)
  }

  // Create the Apollo Client once in the client
  if (!globalApolloClient && IS_BROWSER) {
    globalApolloClient = apolloClient
  }

  return apolloClient
}
