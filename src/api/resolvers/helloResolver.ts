import { kyselyClient } from 'api/kysely/kyselyClient'
import { Resolvers } from 'api/generated/resolversTypes'
import { YogaServerContext } from 'api/types/GraphQLContext'

export const HelloResolver: Resolvers = {
  Query: {
    hello: async (_: unknown, { message }, { user }: YogaServerContext) => {
      const data = await kyselyClient.selectFrom('Product').selectAll().execute()
      console.log('data', data)

      return `Hello ${user.name!}! This is your message: ${message}`
    },
  },
}
