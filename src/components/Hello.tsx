import { useHelloQuery } from '../apollo/generated/graphqlClient'

function Hello({ message }: { message: string }) {
  const { loading, error, data } = useHelloQuery({ variables: { message } })
  if (loading) {
    return <p>loading</p>
  }
  if (error) {
    return <p>{`Error :( ${JSON.stringify(error)}`}</p>
  }

  return <p>{data?.hello}</p>
}

export default Hello
