import { Role } from '@prisma/client'
import { ErrorKey } from 'api/errors'
import { NextResponse } from 'next/server'
import withAuth from 'next-auth/middleware'
import { Route } from 'constants/common/routes'

/**
 * For any member route, we want to ensure that the user is authenticated.
 * For any admin route, we want to ensure that the user is authenticated and has admin permissions. An admin
 * route is a route that starts with the '/admin' path.
 * Any other route that should not be authenticated should be added to the matcher array.
 */
export default withAuth(
  (req) => {
    const {
      url,
      nextauth: { token },
      nextUrl: { pathname },
    } = req
    if (!token) {
      return NextResponse.redirect(new URL(Route.SignIn, url))
    }

    const isAdminRoute = pathname.startsWith(Route.Admin)
    const hasAdminPermission = token.roles.includes(Role.Admin)

    if (isAdminRoute && !hasAdminPermission) {
      return NextResponse.redirect(
        new URL(`${Route.Error}?errorMessage=${ErrorKey.Forbidden}`, url),
      )
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token
      },
    },
    pages: {
      signIn: Route.SignIn,
    },
  },
)

// eslint-disable-next-line @typescript-eslint/naming-convention
export const config = {
  // https://nextjs.org/docs/advanced-features/middleware#matcher
  matcher: ['/admin/:path*', '/member/:path*'],
}
