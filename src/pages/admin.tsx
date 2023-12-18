import type { NextPage } from 'next'
import Link from 'next/link'
import { Route } from 'constants/common/routes'

const Admin: NextPage = () => {
  return (
    <div>
      <p>title</p>
      <Link passHref href={Route.Base}>
        <button>Home</button>
      </Link>
    </div>
  )
}

export default Admin
