import { makeExecutableSchema } from '@graphql-tools/schema'
import { schemaDirectives } from 'api/graphql/directives'
import typeDefs from 'api/graphql/typeDefs'
import resolvers from 'api/resolvers'

const executableSchema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

export const schema = schemaDirectives.reduce(
  (acc, currentValue) => currentValue(acc),
  executableSchema,
)
