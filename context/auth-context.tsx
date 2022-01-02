import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContextType = {
  user: any;
  login: (user: any) => void;
  logout: () => void;
};

type Props = {
  children?: ReactNode;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  login: user => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(
  authContextDefaultValues
);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);

  const loginHandler = (user: any) => {
    setUser(user);
  };

  const logoutHandler = () => {
    setUser(null);
  };

  const contextValue = {
    user: user,
    login: loginHandler,
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
