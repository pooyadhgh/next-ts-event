import { useRef, ReactEventHandler, useContext } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import Layout from '@/components/Layout';
import Input from '@/components/Input';
import Button from '@/components/Button';
import AuthContext from 'context/auth-context';

const Register: NextPage = () => {
  const { register } = useContext(AuthContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler: ReactEventHandler = event => {
    event.preventDefault();
    const name = nameRef.current?.value!;
    const email = emailRef.current?.value!;
    const password = passwordRef.current?.value!;

    register(name, email, password);
  };

  return (
    <Layout title="Register" description="Register Page">
      <h1 className="text-center text-2xl font-semibold text-primary mt-1">
        Register a new account
      </h1>
      <form
        className="w-full sm:w-8/12 md:w-4/12"
        onSubmit={submitHandler}
      >
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="Enter your name"
          ref={nameRef}
        />

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
          <Button>Sign up</Button>
        </div>

        <div className="text-center mt-8 w-3/6 block m-auto">
          <p>
            Already have an account?{' '}
            <Link href="/auth/login">Sign in now</Link>
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
