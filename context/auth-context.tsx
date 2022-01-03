import { createContext, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';

type AuthContextType = {
  user: any;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
};

type Props = {
  children?: ReactNode;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  login: (email, password) => {},
  register: (name, email, password) => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(
  authContextDefaultValues
);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!user) checkUserLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loginHandler = async (email: string, password: string) => {
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });
      setUser(data.user);
      // TODO: Add Toast
    } catch (error) {
      console.log(error);
    }
  };

  const registerHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });
      setUser(data.user);
      // TODO: Add Toast
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      // TODO: Add Toast
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get('/api/auth');
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    user: user,
    login: loginHandler,
    register: registerHandler,
    logout: logoutHandler,
  };

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
