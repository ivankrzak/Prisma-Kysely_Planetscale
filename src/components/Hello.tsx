import { useTranslation } from 'next-i18next'
import { useHelloQuery } from '../apollo/generated/graphqlClient'

function Hello({ message }: { message: string }) {
  const { loading, error, data } = useHelloQuery({ variables: { message } })
  const { t } = useTranslation('common')
  if (loading) {
    return <p>{t('loading')}</p>
  }
  if (error) {
    return <p>{`Error :( ${JSON.stringify(error)}`}</p>
  }

  return <p>{data?.hello}</p>
}

export default Hello
