import { Link, useLocation } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'

function Navbar() {
  const location = useLocation()
  
  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path
  }
  
  // Navigation links data
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/apps', label: 'Apps' },
    { path: '/installation', label: 'Installation' }
  ]

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <img 
            src="/assets/logo.png" 
            alt="Hero.io Logo" 
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-purple-600">
            HERO.IO
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contribute Button */}
        <Link
          to="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <FaGithub className="text-lg" />
          <span>Contribute</span>
        </Link>

        {/* Mobile Menu Button (for future mobile implementation) */}
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-purple-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar