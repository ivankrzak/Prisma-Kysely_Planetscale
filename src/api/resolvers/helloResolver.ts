import { Resolvers } from 'api/generated/resolversTypes'
import { YogaServerContext } from 'api/types/GraphQLContext'

export const HelloResolver: Resolvers = {
  Query: {
    hello: (_: unknown, { message }, { user }: YogaServerContext) =>
      `Hello ${user.name!}! This is your message: ${message}`,
  },
}
