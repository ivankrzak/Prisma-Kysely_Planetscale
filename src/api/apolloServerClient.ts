import { ApolloClient } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { schema } from 'api/graphql/schema'
import { ApolloServerClientContext } from 'api/types/GraphQLContext'
import { createInMemoryCache } from 'utils/app/createInMemoryCache'

/**
 * Returns a new instance of Apollo client used on the server (SSG, SSR). The original example no
 * longer works (using 'require' on local modules returns a promise) and thus the client-side and
 * server-side clients have been split.
 * @param context Additional context (request information, etc.).
 * @returns A server side Apollo client instance.
 */
export function initializeApolloServerClient(context?: ApolloServerClientContext) {
  // For SSG and SSR always create a new Apollo Client
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context }),
    cache: createInMemoryCache(),
  })
}
