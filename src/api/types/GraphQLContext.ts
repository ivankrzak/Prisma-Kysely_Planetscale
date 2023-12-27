import { User } from 'api/kysely/kyselyClient'
import { YogaInitialContext } from 'graphql-yoga'
import { GetServerSidePropsContext } from 'next'

export type YogaServerContext = YogaInitialContext & {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
  user: User
}

// TODO adjust server context to your needs
// eslint-disable-next-line @typescript-eslint/ban-types
export type ApolloServerClientContext = {}
