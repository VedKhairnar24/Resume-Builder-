import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateResume from './pages/CreateResume';
import TemplatesPage from './pages/Templates';
import Login from './pages/Login';
import Register from './pages/Register';
import CareerPathwayExplorer from './pages/CareerPathwayExplorer';
import LinkedInOptimizerPage from './pages/LinkedInOptimizerPage';
import EmailTemplateLibrary from './pages/EmailTemplateLibrary';
import ResourceLibrary from '../../ResourceLibrary';
import ProfileDashboard from './pages/Profile';


function App() {
  useEffect(() => {
    // Cleanup function to remove styles when component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      // You might want to clear other styles here if needed in the future
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header /> 
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-resume" element={
                <ProtectedRoute>
                  <CreateResume />
                </ProtectedRoute>
              } />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/career-explorer" element={<CareerPathwayExplorer />} />
              <Route path="/linkedin-optimizer" element={<LinkedInOptimizerPage />} />
              <Route path="/email-templates" element={<EmailTemplateLibrary />} />
              <Route path="/resource-library" element={<ResourceLibrary />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileDashboard />
                </ProtectedRoute>
              } />
              {/* <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } /> */}
              {/* Catch-all route for debugging */}
              <Route path="*" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold text-red-600">404 - Page Not Found</h1><p>This route doesn't exist</p></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;