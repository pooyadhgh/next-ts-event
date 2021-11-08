import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full bg-primary flex flex-wrap pl-6 h-full items-center	">
      <div className="h-16 flex items-center">
        <h1 className="text-lg font-semibold text-white">
          <Link href="/">Next Event</Link>
        </h1>
      </div>

      <nav className="ml-6">
        <ul className="flex">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              className="text-white font-medium hover:border-tertiary hover:bg-secondary rounded px-4 py-2"
              href="https://github.com/pooyadhgh/Next-TS-Event"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
