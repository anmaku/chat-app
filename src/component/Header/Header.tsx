import { chakra, Container, Heading } from '@chakra-ui/react'

export const Header = () => {
  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}> Status Log out  </Heading>
      </Container>
    </chakra.header>
  )
}