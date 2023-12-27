import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import * as Sentry from '@sentry/nextjs'
import { ForbiddenError, UnauthorizedError } from 'api/errors'
import { Role } from 'api/generated/resolversTypes'
import { YogaServerContext } from 'api/types/GraphQLContext'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'

const authDirective = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, 'auth')?.[0]
      if (!directive) {
        return fieldConfig
      }
      const roles = directive.roles as Role[] | null
      const { resolve = defaultFieldResolver } = fieldConfig
      // eslint-disable-next-line no-param-reassign
      fieldConfig.resolve = (source, args, context: YogaServerContext, info) => {
        if (!roles || roles.length === 0) {
          if (!context.user?.id) {
            throw new UnauthorizedError()
          }
        } else if (roles.length > 0) {
          if (!roles.every((role) => context.user.role === role)) {
            throw new ForbiddenError()
          }
        }

        Sentry.setUser({
          id: context.user?.id,
          email: context.user?.email ?? undefined,
        })

        return resolve(source, args, context, info)
      }
      return fieldConfig
    },
  })

export const schemaDirectives = [authDirective]
