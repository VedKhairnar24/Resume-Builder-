import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile, updatePreferences, updatePassword, deleteAccount, exportUserData } from '../services/api';

const ProfileDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: { first: '', last: '' },
    targetRole: '',
    industry: 'Other',
    careerStage: 'entry',
    location: { city: '', country: '' },
    phone: '',
    profilePicture: ''
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    marketingEmails: false,
    dataUsageConsent: false
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Delete account state
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || { first: '', last: '' },
        targetRole: user.careerProfile?.targetRole || '',
        industry: user.careerProfile?.industry || 'Other',
        careerStage: user.careerProfile?.careerStage || 'entry',
        location: user.careerProfile?.location || { city: '', country: '' },
        phone: user.careerProfile?.phone || '',
        profilePicture: user.profilePicture || ''
      });

      setPreferences({
        emailNotifications: user.preferences?.emailNotifications ?? true,
        marketingEmails: user.preferences?.marketingEmails ?? false,
        dataUsageConsent: user.preferences?.dataUsageConsent ?? false
      });
    }
  }, [user]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/'); // Redirect to home page after sign out
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(profileData);
      showMessage('success', 'Profile updated successfully!');
    } catch (error) {
      showMessage('error', error.error || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updatePreferences(preferences);
      showMessage('success', 'Preferences updated successfully!');
    } catch (error) {
      showMessage('error', error.error || 'Failed to update preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updatePassword(passwordData);
      showMessage('success', 'Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showMessage('error', error.error || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      const response = await exportUserData();
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-builder-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showMessage('success', 'Data exported successfully!');
    } catch (error) {
      showMessage('error', error.error || 'Failed to export data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      showMessage('error', 'Please enter your password to confirm account deletion');
      return;
    }

    setIsLoading(true);
    try {
      await deleteAccount({ password: deletePassword });
      showMessage('success', 'Account deleted successfully');
      setTimeout(() => {
        signOut();
      }, 2000);
    } catch (error) {
      showMessage('error', error.error || 'Failed to delete account');
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
      setDeletePassword('');
    }
  };

  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Sales', 'Design', 'Engineering', 'Consulting', 'Other'];
  const careerStages = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Career' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'executive', label: 'Executive' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {user?.name?.first?.[0]}{user?.name?.last?.[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-grow ml-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user?.name?.first} {user?.name?.last}
                  </h1>
                  <p className="text-blue-100">{user?.email}</p>
                  <div className="flex items-center mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user?.emailVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user?.emailVerified ? '✓ Verified' : '⚠ Unverified'}
                    </span>
                    <span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white">
                      {user?.subscription?.tier || 'Free'} Plan
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex-shrink-0 shadow-md hover:shadow-lg"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'profile', label: 'Profile', icon: '👤' },
                { id: 'preferences', label: 'Preferences', icon: '⚙️' },
                { id: 'security', label: 'Security', icon: '🔒' },
                { id: 'account', label: 'Account', icon: '🗑️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mx-6 mt-4 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.name?.first || ''}
                      onChange={(e) => setProfileData({...profileData, name: {...profileData.name, first: e.target.value}})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.name?.last || ''}
                      onChange={(e) => setProfileData({...profileData, name: {...profileData.name, last: e.target.value}})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
                  <input
                    type="text"
                    value={profileData.targetRole || ''}
                    onChange={(e) => setProfileData({...profileData, targetRole: e.target.value})}
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={profileData.industry || 'Other'}
                      onChange={(e) => setProfileData({...profileData, industry: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Career Stage</label>
                    <select
                      value={profileData.careerStage || 'entry'}
                      onChange={(e) => setProfileData({...profileData, careerStage: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {careerStages.map(stage => (
                        <option key={stage.value} value={stage.value}>{stage.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={profileData.location?.city || ''}
                      onChange={(e) => setProfileData({...profileData, location: {...profileData.location, city: e.target.value}})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={profileData.location?.country || ''}
                      onChange={(e) => setProfileData({...profileData, location: {...profileData.location, country: e.target.value}})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone || ''}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture URL</label>
                  <input
                    type="url"
                    value={profileData.profilePicture || ''}
                    onChange={(e) => setProfileData({...profileData, profilePicture: e.target.value})}
                    placeholder="https://example.com/your-photo.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <form onSubmit={handlePreferencesUpdate} className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive important updates about your account and resumes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.emailNotifications}
                        onChange={(e) => setPreferences({...preferences, emailNotifications: e.target.checked})}
                        className="sr-only peer"
                      /><div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                      <p className="text-sm text-gray-600">Receive tips, updates, and promotional content</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketingEmails}
                        onChange={(e) => setPreferences({...preferences, marketingEmails: e.target.checked})}
                        className="sr-only peer"
                      /><div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Data Usage Consent</h3>
                      <p className="text-sm text-gray-600">Allow us to use your data to improve our AI features</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.dataUsageConsent}
                        onChange={(e) => setPreferences({...preferences, dataUsageConsent: e.target.checked})}
                        className="sr-only peer"
                      /><div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Update Preferences'}
                </button>
              </form>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                
                {/* Password Change */}
                <form onSubmit={handlePasswordUpdate} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>

                {/* Data Export */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Data Export</h3>
                  <p className="text-gray-600 mb-4">
                    Download all your data including profile information and resumes in JSON format.
                  </p>
                  <button
                    onClick={handleExportData}
                    disabled={isLoading}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoading ? 'Exporting...' : 'Export My Data'}
                  </button>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Management</h2>
                
                {/* Account Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Email:</span> {user?.email}</p>
                    <p><span className="font-medium">Member since:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
                    <p><span className="font-medium">Last login:</span> {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</p>
                    <p><span className="font-medium">Subscription:</span> {user?.subscription?.tier || 'Free'} Plan</p>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-red-900 mb-4">Delete Account</h3>
                  <p className="text-red-700 mb-4">
                    This action cannot be undone. This will permanently delete your account and all associated data.
                  </p>
                  
                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Delete Account
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-red-700 mb-2">
                          Enter your password to confirm deletion:
                        </label>
                        <input
                          type="password"
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          className="w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Your password"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={handleDeleteAccount}
                          disabled={isLoading || !deletePassword}
                          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                        >
                          {isLoading ? 'Deleting...' : 'Confirm Delete'}
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setDeletePassword('');
                          }}
                          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;