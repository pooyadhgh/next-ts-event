import { ReactEventHandler, useRef } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import Layout from '@/components/Layout';
import Input from '@/components/Input';
import Button from '@/components/Button';

const Login: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler: ReactEventHandler = async event => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password,
      });
      console.log(res.data);
      // TODO: Update context / Add Toast
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Login" description="Login Page">
      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        Login
      </h1>
      <form
        className="w-full sm:w-8/12 md:w-4/12"
        onSubmit={submitHandler}
      >
        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="Enter your email address"
          ref={emailRef}
        />

        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <div className="text-center mt-8 w-3/6 block m-auto">
          <Button>Sign in</Button>
        </div>

        <div className="text-center mt-8 w-3/6 block m-auto">
          <p>
            Not registered yet?{' '}
            <Link href="/auth/register" passHref>
              <p className="underline cursor-pointer text-blue-500">
                Sign up now
              </p>
            </Link>
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
