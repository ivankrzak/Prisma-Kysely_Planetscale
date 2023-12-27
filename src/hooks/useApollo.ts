import { useMemo } from 'react'
import { NormalizedCacheObject } from '@apollo/client'
import { Config, initializeApolloClient } from 'apollo/client'

/**
 * Returns a new (or existing, if already created) Apollo client-side client instance. The
 * instance's cache can be pre-populated (rehydrated) with data from the server (SSG, SSR) by
 * passing the `initialState` argument.
 * @param initialState Initial state from SSG/SSR to hydrate on the client.
 * @param config Optional configuration for Apollo client
 * @returns Apollo client-side client instance.
 */
export const useApollo = (initialState?: NormalizedCacheObject, config?: Config) => {
  const apolloClient = useMemo(
    () => initializeApolloClient({ initialState, config }),
    [initialState, config],
  )
  return apolloClient
}
