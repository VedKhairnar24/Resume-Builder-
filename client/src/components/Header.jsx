import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const growzenLogo = '/Logo Growzen Branding.png';

const Header = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
      isActive
        ? 'text-teal-400 border-b-2 border-teal-400'
        : 'text-gray-200 hover:text-white hover:border-b-2 hover:border-teal-400'
    }`;

  return (
    <header className="w-full bg-gray-900 shadow-lg sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div className="bg-gray-800 text-gray-300 text-xs sm:text-sm flex justify-end items-center px-6 py-1 space-x-6">
        <a href="mailto:contact@growzen.com" className="hover:text-white">contact@growzen.com</a>
        {/* <span>|</span>
        <a href="/login" className="hover:text-white">Login</a>
        <span>|</span>
        <a href="/register" className="hover:text-white">Sign Up</a> */}
      </div>

      {/* Main Navigation */}
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img src={growzenLogo} alt="Growzen Logo" className="h-9 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/career-explorer" className={navLinkClasses}>
                Career Explorer
              </NavLink>
              <NavLink to="/linkedin-optimizer" className={navLinkClasses}>
                LinkedIn Optimizer
              </NavLink>
              <NavLink to="/email-templates" className={navLinkClasses}>
                Email Templates
              </NavLink>
              <NavLink to="/resource-library" className={navLinkClasses}>
                Resource Library
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/create-resume" className={navLinkClasses}>
                  Create Resume
                </NavLink>
              )}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <NavLink to="/profile" className="text-gray-300 hover:text-white transition">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </NavLink>
              ) : (
                <NavLink
                  to="/register"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Get Started
                </NavLink>
              )}
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                {!isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              <NavLink to="/career-explorer" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                Career Explorer
              </NavLink>
              <NavLink to="/linkedin-optimizer" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                LinkedIn Optimizer
              </NavLink>
              <NavLink to="/email-templates" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                Email Templates
              </NavLink>
              <NavLink to="/resource-library" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                Resource Library
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/create-resume" className={navLinkClasses} onClick={() => setIsMenuOpen(false)}>
                  Create Resume
                </NavLink>
              )}
              <div className="border-t border-gray-700 pt-3">
                {isAuthenticated ? (
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 w-full text-left text-white px-4 py-2 rounded-md text-sm font-medium transition hover:bg-gray-700"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Profile & Settings</span>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Get Started
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
