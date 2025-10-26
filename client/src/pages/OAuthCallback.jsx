import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const provider = searchParams.get('provider');
    const error = searchParams.get('error');

    if (error) {
      // Handle OAuth errors
      let errorMessage = 'Authentication failed';
      if (error === 'oauth_error') {
        errorMessage = 'OAuth authentication error occurred';
      } else if (error === 'oauth_failed') {
        errorMessage = 'OAuth authentication was cancelled or failed';
      }
      
      navigate('/login', { 
        state: { 
          error: errorMessage,
          provider: provider 
        } 
      });
      return;
    }

    if (token) {
      // Store token and redirect to dashboard
      localStorage.setItem('token', token);
      
      // Update auth context
      signIn({ token });
      
      // Redirect to dashboard
      navigate('/', { 
        state: { 
          message: `Successfully signed in with ${provider}`,
          provider: provider 
        } 
      });
    } else {
      // No token, redirect to login
      navigate('/login', { 
        state: { 
          error: 'Authentication failed - no token received',
          provider: provider 
        } 
      });
    }
  }, [searchParams, navigate, signIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Completing Sign In</h1>
          <p className="text-gray-600">Please wait while we complete your authentication...</p>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
