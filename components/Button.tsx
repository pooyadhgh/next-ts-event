import { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
  href: string;
  onClick?: () => void;
};

const Button = ({ children, href, onClick }: Props) => {
  return (
    <button
      className="w-full bg-primary text-white font-medium hover:border-secondary hover:bg-secondary rounded px-4 py-2"
      onClick={onClick}
    >
      <Link href={href} passHref>
        {children}
      </Link>
    </button>
  );
};

export default Button;
