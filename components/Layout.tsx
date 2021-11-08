import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children?: ReactNode;
  title?: string;
  keywords?: string;
  description?: string;
  className?: string;
};

const Layout = ({
  children,
  title = 'Next Event',
  description = 'A Next.js Applicaiton to show events',
  keywords = 'event, nextjs, typescript, tailwind, html, css, react, javascript',
  className,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main
        className={`flex flex-col items-center justify-center flex-wrap mt-5 mb-14 mx-5 h-full ${className}`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
