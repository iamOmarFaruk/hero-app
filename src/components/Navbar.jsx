import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'

function Navbar() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path
  }
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }
  
  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  
  // Navigation links data
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/apps', label: 'Apps' },
    { path: '/installation', label: 'Installation' }
  ]

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity z-50">
          <img 
            src="/assets/logo.png" 
            alt="Hero.io Logo" 
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-purple-600">
            HERO.IO
          </span>
        </Link>

        {/* Navigation Links - Desktop */}
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

        {/* Contribute Button - Always visible */}
        <Link
          to="https://github.com/iamOmarFaruk"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center space-x-2 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        >
          <FaGithub className="text-lg" />
          <span>Contribute</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-purple-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              // X icon for close
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu - Overlay */}
        <div 
          className={`fixed inset-0 bg-white bg-opacity-80 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMobileMenu}
        ></div>
        
        {/* Mobile Menu - Content */}
        <div 
          className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-40 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full py-16 px-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`block text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile Contribute Button */}
            <Link
              to="https://github.com/iamOmarFaruk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="mt-8 flex items-center justify-center space-x-2 text-white font-medium px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              <FaGithub className="text-lg" />
              <span>Contribute</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar