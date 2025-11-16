import { Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'MAUSISANG PRINSESA' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30">
      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#home" className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium">
          Home
        </a>
        <a href="#details" className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium">
          Story Details
        </a>
        <a href="#read" className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium">
          Read Online
        </a>
        <a href="#author" className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium">
          About the Author
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-gray-800 hover:text-gray-600 transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 py-4 px-6 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#home" className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium">
              Home
            </a>
            <a href="#details" className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium">
              Story Details
            </a>
            <a href="#read" className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium">
              Read Online
            </a>
            <a href="#author" className="text-gray-800 hover:text-gray-600 transition-colors text-sm font-medium">
              About the Author
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
