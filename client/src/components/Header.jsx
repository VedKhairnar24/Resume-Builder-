import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Resume Builder</Link>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/create-resume" className="hover:text-gray-300">Create Resume</Link>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;