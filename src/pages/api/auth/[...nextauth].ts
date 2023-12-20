import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Role } from '@prisma/client'
import { PrismaClient } from 'api/prisma/prismaClient'
import { onUserCreated } from 'api/services/userService'
import { ApiEnv } from 'api/utils/apiEnv'
import { addSeconds, getUnixTime } from 'date-fns'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { Provider } from 'next-auth/providers'
import Auth0Provider from 'next-auth/providers/auth0'
import Email from 'next-auth/providers/email'
import { ONE_DAY, REFETCH_INTERVAL } from 'constants/common/auth'
import { Route } from 'constants/common/routes'

export const providers: Provider[] = [
  Email({
    server: {
      host: ApiEnv.SMTP_HOST,
      port: Number(ApiEnv.SMTP_PORT),
      auth: {
        user: ApiEnv.SMTP_USER,
        pass: ApiEnv.SMTP_PASSWORD,
      },
    },
    from: ApiEnv.EMAIL_FROM,
  }),
  Auth0Provider({
    clientId: ApiEnv.AUTH0_CLIENT_ID,
    clientSecret: ApiEnv.AUTH0_CLIENT_SECRET,
    issuer: ApiEnv.AUTH0_ISSUER,
  }),
]

export const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(PrismaClient),
  // Configure one or more authentication providers
  providers,
  theme: {
    colorScheme: 'light',
  },
  session: {
    strategy: 'jwt',
    maxAge: ONE_DAY,
    updateAge: REFETCH_INTERVAL,
  },
  jwt: {
    maxAge: ONE_DAY,
  },
  callbacks: {
    jwt: ({ token, user }) => ({
      ...token,
      ...user,
      exp: getUnixTime(addSeconds(Date.now(), ONE_DAY)),
      roles: user?.roles ?? (token?.roles.length ? token.roles : [Role.Member]),
    }),
    session: ({ session, token }) => ({
      ...session,
      user: token,
    }),
  },
  events: {
    createUser: async ({ user }) => {
      await onUserCreated(user)
    },
  },
  pages: {
    signIn: Route.SignIn,
    error: Route.Error,
  },
}

export default NextAuth(AuthOptions)
