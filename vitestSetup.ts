import { vi } from 'vitest'

/**
 * Logged in user can be set like this:
 * const getServerSessionMock = vi.mocked(getServerSession<AuthOptions, TestSession>)
 * getServerSessionMock.mockResolvedValueOnce(getMockedSession({ ...user, id: '1' }))
 */
vi.mock('next-auth', async (originalImport: () => Promise<object>) => {
  const originalModule = await originalImport()
  const getServerSessionMock = vi.fn()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...originalModule,
    getServerSession: getServerSessionMock,
  }
})
