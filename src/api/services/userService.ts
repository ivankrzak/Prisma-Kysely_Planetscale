import { Role, User } from '@prisma/client'
import { PrismaClient } from 'api/prisma/prismaClient'
import { logger } from './loggerService'

export function updateUserRoles(user: User, roles: Role[]): Promise<User> {
  logger.debug('updateUserRoles', { user, roles })
  return PrismaClient.user.update({
    where: { id: user.id },
    data: {
      roles,
    },
  })
}

export function onUserCreated(user: User): Promise<User> {
  logger.debug('onUserCreated', { user })
  return updateUserRoles(user, [Role.Member])
}
