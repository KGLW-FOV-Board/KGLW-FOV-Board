import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full flex items-center justify-around py-5 px-24 border-b border-grey-700 bg-black z-50'>
        <Link href="/" className="transition duration-300 hover:scale-110">Home</Link>
        <ul className="flex gap-10 text-lg">
            <Link href="/About" className="text-grey-300 hover:text-white trasition-colors">About Us</Link>
            <Link href="/2025" className="text-grey-300 hover:text-white trasition-colors">2025 Board</Link>
        </ul>
    </nav>
  )
}

export default Navbar