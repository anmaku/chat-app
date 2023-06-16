import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  useToast,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'



export const Page = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
      toast({
        title: 'Logged in Successfully',
        status: 'success',
        position: 'top',
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        toast({
          title: 'Something went wrong.',
          status: 'error',
          position: 'top',
        })
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Container py={14}>
      <Heading>Signin</Heading>
      <chakra.form onSubmit={handleSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type={'email'}
                name={'email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type={'password'}
                name={'password'}
                value={password}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden/>
        <Center>
          <Button type={'submit'} isLoading={isLoading}>
            Login
          </Button>
        </Center>
      </chakra.form>
    </Container>
  )
}

export default Page