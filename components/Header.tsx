import { useContext } from 'react';
import AuthContext from 'context/auth-context';
import Link from 'next/link';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="w-full bg-primary flex  pl-6 h-full items-center	">
      <div className="h-16 flex items-center w-28">
        <h1 className="text-lg font-semibold text-white">
          <Link href="/">Next Event</Link>
        </h1>
      </div>

      <nav className=" w-full">
        <ul className="flex w-full">
          <li className=" text-white font-medium hover:border-tertiary hover:bg-secondary rounded px-4 py-2">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/pooyadhgh/Next-TS-Event"
            >
              Github
            </a>
          </li>

          {!user && (
            <li className="block ml-auto mr-8 text-white font-medium hover:border-tertiary hover:bg-secondary rounded px-4 py-2">
              <Link href="/auth/login">Login</Link>
            </li>
          )}

          {user && (
            <li
              onClick={logout}
              className="block ml-auto mr-8 cursor-pointer text-white font-medium hover:border-tertiary hover:bg-secondary rounded px-4 py-2"
            >
              Logout
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
