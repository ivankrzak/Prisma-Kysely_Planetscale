import { User } from 'api/kysely/kyselyClient'

export type TestSession = {
  user: User
}

export function getMockedSession(user: User) {
  return {
    user,
  }
}
