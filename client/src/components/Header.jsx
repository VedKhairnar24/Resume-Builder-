import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Resume Builder</Link>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/create-resume" className="hover:text-gray-300">Create Resume</Link>
                <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Welcome, {user?.name}</span>
                  <button
                    onClick={signOut}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;