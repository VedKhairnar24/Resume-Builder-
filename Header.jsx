import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, BookCopy } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/career-explorer', text: 'Career Explorer' },
    { to: '/linkedin-optimizer', text: 'LinkedIn Optimizer' },
    { to: '/email-templates', text: 'Email Templates' },
    { to: '/resource-library', text: 'Resource Library' },
    { to: '/create-resume', text: 'Create Resume' },
  ];

  const activeLinkStyle = {
    color: '#2563EB', // blue-600
    fontWeight: '600',
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <BookCopy className="w-7 h-7 text-blue-600" />
              <span>GrowZen</span>
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-blue-600 transition-colors">
                {link.text}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">Log In</Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Sign Up</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{link.text}</NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;