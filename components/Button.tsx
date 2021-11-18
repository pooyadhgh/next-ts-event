import { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, href, onClick, className }: Props) => {
  if (!href) {
    return (
      <button
        className={`w-full bg-primary text-white font-medium hover:border-secondary hover:bg-secondary rounded px-4 py-2 lg:max-w-sm ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <Link href={href} passHref>
      <button
        className={`w-full bg-primary text-white font-medium hover:border-secondary hover:bg-secondary rounded px-4 py-2 lg:max-w-sm ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
