import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between py-4 px-6 md:px-24 border-b border-gray-700 bg-black z-50">
      
      <Link href="/" className="transition duration-300 hover:scale-110 text-sm md:text-base">
        Home
      </Link>

      <ul className="flex gap-4 md:gap-10 items-center">
        <li>
          <Link href="/About" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
            About Us
          </Link>
        </li>

        <li>
          <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
            2025 Board
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;