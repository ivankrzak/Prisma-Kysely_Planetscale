import { PrismaClient } from 'api/prismaClient'
import { onUserCreated } from 'api/services/userService'
import { createRandomUser } from 'api/testing/__utils__/userFactory'
import { describe, expect, test } from 'vitest'

describe('UserService', () => {
  /**
   * Note @t-ondrej: We would like to run each integration test in a transaction to
   * run the tests in isolation and to be able to rollback the changes. This way
   * tests do not affect each other.
   *
   * At the moment Prisma doesn't offer an easy way to do this. Anything that should run
   * in the same transaction, need to act upon the shared object returned from the .transaction call.
   * If the transaction needs to be started in the test, it's hard to propagate it to the application logic.
   * To mitigate this, we could probably use AsyncLocalStorage (https://nodejs.org/api/async_context.html) as
   * an application context.
   *
   * Prisma doesn't provide a first-class support for rollbacks. However, we could implement a client
   * extension as shown here (https://github.com/prisma/prisma/issues/12458#issuecomment-1476410897).
   */
  test('should initialize a new user with the Member role', async () => {
    const user = await PrismaClient.user.create({
      data: createRandomUser(),
    })
    expect(user.roles).toEqual([])

    await onUserCreated(user)

    const updatedUser = await PrismaClient.user.findUnique({
      where: { id: user.id },
    })
    expect(updatedUser?.roles).toEqual(['Member'])
  })
})
