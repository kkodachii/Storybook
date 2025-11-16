import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  title: string;
  rightContent?: React.ReactNode;
}

export default function Navbar({ title, rightContent }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 relative shadow-sm w-full">
      {rightContent && (
        <div className="absolute top-4 right-4 z-10 hidden md:block">
          {rightContent}
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight truncate pr-4">{title}</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#home" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group whitespace-nowrap">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </a>
            <a href="#details" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group whitespace-nowrap">
              Story Details
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </a>
            <a href="#read" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group whitespace-nowrap">
              Read Online
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </a>
            <a href="#author" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative group whitespace-nowrap">
              About the Author
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 space-y-1">
            <a 
              href="#home" 
              className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#details" 
              className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Story Details
            </a>
            <a 
              href="#read" 
              className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Read Online
            </a>
            <a 
              href="#author" 
              className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About the Author
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
