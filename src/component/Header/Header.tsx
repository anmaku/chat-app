import { chakra, Container, Heading } from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'

export const Header = () => {
  const { user } = useAuthContext()
  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}>
          { user ? 'Status: Login' : 'Status Logout' }
        </Heading>
      </Container>
    </chakra.header>
  )
}