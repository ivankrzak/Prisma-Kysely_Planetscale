import { getMockedSession, TestSession } from 'api/testing/__utils__/auth'
import { createRandomUser } from 'api/testing/__utils__/userFactory'
import { executeGQL } from 'api/testing/graphql'
import { HelloDocument, HelloQuery, HelloQueryVariables } from 'apollo/generated/graphqlClient'
import { getServerSession } from 'next-auth'
import { AuthOptions } from 'next-auth/core/types'
import { describe, expect, test, vi } from 'vitest'

describe('HelloResolver', () => {
  const getServerSessionMock = vi.mocked(getServerSession<AuthOptions, TestSession>)

  test('should greet authenticated user', async () => {
    const user = createRandomUser()
    getServerSessionMock.mockResolvedValueOnce(getMockedSession({ ...user, id: '1' }))

    const result = await executeGQL<HelloQuery, HelloQueryVariables>({
      document: HelloDocument,
      variables: { message: 'Hi!' },
    })

    expect(result.data?.hello).toEqual(`Hello ${user.name!}! This is your message: Hi!`)
  })
})
