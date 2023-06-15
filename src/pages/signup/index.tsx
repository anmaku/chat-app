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
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
} from 'firebase/auth'
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
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            await sendEmailVerification(userCredential.user)
            setEmail('')
            setPassword('')
            toast({
                title: 'send Email for confirmation',
                status: 'success',
                position: 'top',
            })
        } catch (e) {
            toast({
                title: 'One or more error occurred',
                status: 'error',
                position: 'top',
            })
            if (e instanceof FirebaseError) {
                console.log(e)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container py={14}>
            <Heading>Sign up</Heading>
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
                                    setPassword(e.target.value)
                                }}
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Spacer height={4} aria-hidden />
                <Center>
                    <Button type={'submit'} isLoading={isLoading}>
                        Create your account
                    </Button>
                </Center>
            </chakra.form>
        </Container>
    )
}

export default Page