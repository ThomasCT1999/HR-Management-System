// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-xl">My App</div>
        <div>
          <Link href="/">
            <a className="text-white px-3">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-white px-3">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-white px-3">Contact</a>
          </Link>
          <Link href="/login">
            <a className="text-white px-3">Login</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
