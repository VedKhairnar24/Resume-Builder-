import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const growzenLogo = '/GrowZen Logo.png';

const Header = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-semibold uppercase tracking-wide transition
     ${isActive ? 'text-cyan-600' : 'text-gray-600 hover:text-gray-900'}
     after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-cyan-500
     after:scale-x-0 after:transition-transform after:origin-left
     ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
    `;

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={growzenLogo} alt="Growzen Logo" className="h-9 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
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
                <NavLink
                  to="/profile"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </NavLink>
              ) : (
                <NavLink
                  to="/register"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Get Started
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
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
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-4 flex flex-col gap-3">

              <NavLink
                to="/career-explorer"
                className="block w-full px-3 py-2 text-sm font-semibold text-gray-700 rounded-md hover:bg-gray-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Career Explorer
              </NavLink>

              <NavLink
                to="/linkedin-optimizer"
                className="block w-full px-3 py-2 text-sm font-semibold text-gray-700 rounded-md hover:bg-gray-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                LinkedIn Optimizer
              </NavLink>

              <NavLink
                to="/email-templates"
                className="block w-full px-3 py-2 text-sm font-semibold text-gray-700 rounded-md hover:bg-gray-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Email Templates
              </NavLink>

              <NavLink
                to="/resource-library"
                className="block w-full px-3 py-2 text-sm font-semibold text-gray-700 rounded-md hover:bg-gray-100 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Resource Library
              </NavLink>

              {isAuthenticated && (
                <NavLink
                  to="/create-resume"
                  className="block w-full px-3 py-2 text-sm font-semibold text-gray-700 rounded-md hover:bg-gray-100 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Resume
                </NavLink>
              )}

              {/* Auth Mobile */}
              <div className="pt-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                  >
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 01112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Profile & Settings</span>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/register"
                    className="block text-center bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                    onClick={() => setIsMenuOpen(false)}
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
