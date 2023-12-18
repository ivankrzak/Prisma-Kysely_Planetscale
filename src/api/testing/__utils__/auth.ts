import { User } from '@prisma/client'

export type TestSession = {
  user: User
}

export function getMockedSession(user: User) {
  return {
    user,
  }
}
