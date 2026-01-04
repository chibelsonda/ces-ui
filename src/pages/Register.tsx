import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Container,
  Divider,
  Anchor,
  Center,
  Paper,
} from '@mantine/core';

import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { signupSchema } from '../validation/auth.schema';
import type { SignupFormValues } from '../validation/auth.schema';
import { signup } from '../services/auth.service';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/notification';
import { useMutation } from '@tanstack/react-query';

export default function Register() {
  const form = useForm<SignupFormValues>({
    initialValues: {
      email: 'chi@gmail.com',
      password: '',
    },
    validate: zodResolver(signupSchema),
  });
  const navigate = useNavigate();

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: signup,

    onSuccess: (res) => {
      localStorage.setItem('token', res.token);

      notify('success', 'Signup successful');

      // navigate("/dashboard");
    },
  });

  const handleSubmit = (values: SignupFormValues) => {
    signupMutation(values);
  };

  return (
    <Center
      mih="100vh"
      style={{
        backgroundColor: '#f5f7fb',
      }}
    >
      <Container size="xs" w="90%">
        <Center h="100vh">
          <Paper
            w={{ base: '100%', md: '90%' }}
            p="xl"
            radius="sm"
            withBorder
            shadow="sm"
          >
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Title ta="center" fw={400}>
                Sign Up
              </Title>

              <TextInput
                label="Email"
                {...form.getInputProps('email')}
                mt="md"
              />

              <PasswordInput
                label="Password"
                {...form.getInputProps('password')}
                mt="md"
              />

              <Button
                fullWidth
                type="submit"
                mt="xl"
                loading={isPending}
                disabled={isPending}
              >
                Signup
              </Button>

              <Divider
                label="Or create an account with"
                labelPosition="center"
                my="lg"
              />
            </form>

            <Button
              fullWidth
              leftSection={<FcGoogle size={20} />}
              variant="light"
              mt="md"
            >
              Google
            </Button>

            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Anchor size="sm" href="/forgot-password">
                I forgot my password
              </Anchor>
              <br />
              <Anchor size="sm" href="/login">
                I have an account
              </Anchor>
            </div>
          </Paper>
        </Center>
      </Container>
    </Center>
  );
}
