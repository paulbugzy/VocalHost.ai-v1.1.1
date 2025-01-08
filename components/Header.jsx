import { useState } from 'react';
    import Link from 'next/link';

    export default function Header() {
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

      return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white bg-opacity-30 backdrop-blur-md fixed w-full top-0 z-50 shadow-lg">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600 hover:scale-110 transition-transform">
            VocalHost.ai
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="#home" className="text-gray-800 hover:underline">Home</Link>
            <Link href="#features" className="text-gray-800 hover:underline">Features</Link>
            <Link href="#pricing" className="text-gray-800 hover:underline">Pricing</Link>
            <Link href="#signup" className="text-gray-800 hover:underline">Sign Up</Link>
          </div>

          {/* CTA Button */}
          <button className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:shadow-lg">
            Test the AI
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden flex items-center px-4 py-2" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 right-0 bg-white w-full shadow-lg">
              <Link href="#home" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</Link>
              <Link href="#features" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Features</Link>
              <Link href="#pricing" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Pricing</Link>
              <Link href="#signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign Up</Link>
            </div>
          )}
        </nav>
      );
    }
