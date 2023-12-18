import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'

export function createRandomUser(
  propertiesToOverride: Partial<Omit<User, 'id'>> = {},
): Omit<User, 'id'> {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: null,
    image: null,
    roles: [],
    ...propertiesToOverride,
  }
}
