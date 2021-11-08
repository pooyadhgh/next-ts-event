import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';

const NotFoundPage: NextPage = () => {
  return (
    <Layout title="404 Not Found" className="space-y-12">
      <h2 className="text-red-700 font-bold text-xl ">404 - Not Found</h2>
      <Link href="/" passHref>
        <button className="bg-tertiary text-white font-medium hover:border-tertiary hover:bg-secondary rounded px-4 py-2">
          Go Back Home
        </button>
      </Link>
    </Layout>
  );
};

export default NotFoundPage;
