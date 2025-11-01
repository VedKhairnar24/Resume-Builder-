import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const growzenLogo = '/Logo Growzen Branding.png'; // Vite serves public assets from the root

const Header = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-teal-500 bg-gray-900'
        : 'text-gray-300 hover:text-white hover:bg-gray-700'
    }`;

  return (
    <nav className="bg-gray-800 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-gray-800/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={growzenLogo}
                alt="Growzen Logo"
                className="h-9 w-auto" // adjust size here
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/templates" className={navLinkClasses}>
              Resume-Templates
            </NavLink>
            <NavLink to="/career-explorer" className={navLinkClasses}>
              Career-Explorer
            </NavLink>
            <NavLink to="/linkedin-optimizer" className={navLinkClasses}>
              LinkedIn-Optimizer
            </NavLink>
            <NavLink to="/email-templates" className={navLinkClasses}>
              Email-Templates
            </NavLink>
            <NavLink to="/resource-library" className={navLinkClasses}>
              Resource-Library
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/create-resume" className={navLinkClasses}>
                Create-Resume
              </NavLink>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">
                  Welcome, <span className="font-medium text-white">{user?.name.first}</span>
                </span>
                <button
                  onClick={signOut}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-200"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-gray-800/95 backdrop-blur-sm shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" className={navLinkClasses} onClick={() => setIsMenuOpen(false)} end>
              Home
            </NavLink>
            <NavLink to="/templates" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
              Templates
            </NavLink>
            <NavLink
              to="/career-explorer"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Career Explorer
            </NavLink>
            <NavLink
              to="/linkedin-optimizer"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              LinkedIn Optimizer
            </NavLink>
            <NavLink
              to="/email-templates"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Email Templates
            </NavLink>
            <NavLink
              to="/resource-library"
              className={navLinkClasses}
              onClick={() => setIsMenuOpen(false)}
            >
              Resource Library
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/create-resume"
                className={navLinkClasses}
                onClick={() => setIsMenuOpen(false)}
              >
                Create Resume
              </NavLink>
            )}
          </div>
          <div className="px-4 pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="text-gray-400 text-sm">
                  Signed in as <span className="text-white font-medium">{user?.name?.first}</span>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-center rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-center rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-center rounded-md text-white bg-teal-500 hover:bg-teal-600"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
