import { PrismaClient } from 'api/prisma/prismaClient'
import { logger } from './loggerService'
import { Role, User } from 'api/kysely/kyselyClient'

export function updateUserRoles(user: User, role: Role): Promise<User> {
  logger.debug('updateUserRoles', { user, role })
  return PrismaClient.user.update({
    where: { id: user.id },
    data: {
      role,
    },
  })
}

export function onUserCreated(user: User): Promise<User> {
  logger.debug('onUserCreated', { user })
  return updateUserRoles(user, Role.Member)
}
