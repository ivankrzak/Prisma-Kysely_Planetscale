import { Button, chakra, Container, FormControl, Heading, Input, Stack } from '@chakra-ui/react'
import { useEmailSignInForm } from 'hooks/useEmailSignInForm'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getToken } from 'next-auth/jwt'
import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { LoginFormFieldName, LoginFormFieldPlaceholder } from 'types/auth'
import { Route } from 'constants/common/routes'

const SignIn = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // useLoginCallback()
  const { onSignInSubmit, register, isLoading } = useEmailSignInForm(providers)

  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Heading
            size={{
              base: 'xs',
              md: 'sm',
            }}
            textAlign="center"
          >
            toYourAccount
          </Heading>
        </Stack>
        <Stack spacing="6">
          <chakra.form onSubmit={onSignInSubmit}>
            <Stack spacing="4">
              <FormControl>
                <Input
                  type="email"
                  placeholder={'enterYourEmail'}
                  aria-label={LoginFormFieldPlaceholder.Email}
                  autoComplete="email"
                  {...register(LoginFormFieldName.Email)}
                />
              </FormControl>
              <Button variant="primary" type="submit" isLoading={isLoading}>
                continueWithEmail
              </Button>
            </Stack>
          </chakra.form>
        </Stack>
      </Stack>
    </Container>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = await getToken({ req: context.req })
  const emptyProviders = {} as Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (token) {
    const destination = decodeURIComponent((context.query?.callbackUrl as string) || Route.Base)
    return {
      redirect: {
        destination,
        permanent: false,
      },
      props: {
        providers: emptyProviders,
      },
    }
  }

  const providers = await getProviders()
  return {
    props: {
      providers: providers ?? emptyProviders,
    },
  }
}

export default SignIn
