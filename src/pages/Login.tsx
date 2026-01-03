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
import { loginSchema } from '../validation/auth.schema';
import type { LoginFormValues } from '../validation/auth.schema';
import { login } from '../services/auth.service';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/notification';
import { useMutation } from '@tanstack/react-query';

export default function Login() {
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: 'chi@gmail.com',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,

    onSuccess: (res) => {
      localStorage.setItem('token', res.token);

      notify('success', 'Login successful');

      // navigate("/dashboard");
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    loginMutation(values);
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
                Sign In
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
                Login
              </Button>

              <Divider label="Or sign in with" labelPosition="center" my="lg" />
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
              <Anchor size="sm" href="/signup">
                I don't have an account
              </Anchor>
            </div>
          </Paper>
        </Center>
      </Container>
    </Center>
  );
}
