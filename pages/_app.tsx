import type { AppProps } from 'next/app';
import { AuthContextProvider } from 'context/auth-context';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
