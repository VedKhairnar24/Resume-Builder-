import React, { createContext, useContext, useState, useEffect } from 'react';
import { register, login, logout, getCurrentUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser()
        .then((userData) => {
          setUser(userData.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = async (userData) => {
    try {
      const response = await register(userData);
      setUser(response.data);
      console.log(userData);

      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (userData) => {
    try {
      const response = await login(userData);
      setUser(response.data);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
