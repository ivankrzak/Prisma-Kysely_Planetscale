import type { NextPage } from 'next'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Route } from 'constants/common/routes'
import { Button } from 'components/ui/button'
import { serverSideTranslations } from '../utils/i18n'

const Admin: NextPage = () => {
  const { t } = useTranslation('admin')
  return (
    <div>
      <p>{t('page.title')}</p>
      <Link passHref href={Route.Base}>
        <Button>{t('page.Home')}</Button>
      </Link>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
  props: { ...(await serverSideTranslations(context, ['admin'])) },
})

export default Admin
