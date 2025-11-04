import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../services/api';

const OnboardingQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    targetRole: '',
    industry: 'Other',
    careerStage: 'entry',
    experience: '',
    skills: [],
    goals: ''
  });

  const questions = [
    {
      id: 'targetRole',
      title: 'What role are you targeting?',
      subtitle: 'This helps us personalize your resume templates',
      type: 'input',
      placeholder: 'e.g., Software Engineer, Marketing Manager, Data Scientist'
    },
    {
      id: 'industry',
      title: 'What industry are you in?',
      subtitle: 'Choose the industry that best fits your career',
      type: 'select',
      options: [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'Marketing',
        'Sales',
        'Design',
        'Engineering',
        'Consulting',
        'Other'
      ]
    },
    {
      id: 'careerStage',
      title: 'What\'s your career stage?',
      subtitle: 'This helps us suggest appropriate content',
      type: 'select',
      options: [
        { value: 'entry', label: 'Entry Level (0-2 years)' },
        { value: 'mid', label: 'Mid Career (3-7 years)' },
        { value: 'senior', label: 'Senior Level (8+ years)' },
        { value: 'executive', label: 'Executive Level' }
      ]
    },
    {
      id: 'experience',
      title: 'How many years of professional experience do you have?',
      subtitle: 'Include internships and part-time work',
      type: 'select',
      options: [
        '0-1 years',
        '2-3 years',
        '4-6 years',
        '7-10 years',
        '11-15 years',
        '16+ years'
      ]
    },
    {
      id: 'goals',
      title: 'What\'s your main career goal?',
      subtitle: 'This helps us tailor our recommendations',
      type: 'select',
      options: [
        'Get my first job',
        'Advance in my current role',
        'Switch to a new industry',
        'Start my own business',
        'Become a manager/leader',
        'Increase my salary',
        'Work remotely',
        'Other'
      ]
    }
  ];

  const handleInputChange = (value) => {
    setFormData(prev => ({
      ...prev,
      [questions[currentStep].id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      await updateProfile({
        targetRole: formData.targetRole,
        industry: formData.industry,
        careerStage: formData.careerStage,
        experience: formData.experience,
        goals: formData.goals
      });
      
      navigate('/create-resume', { 
        state: { 
          message: 'Welcome! Let\'s create your first resume.',
          onboardingComplete: true 
        } 
      });
    } catch (error) {
      console.error('Onboarding error:', error);
      // Still navigate to create resume even if profile update fails
      navigate('/create-resume');
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome to GrowZen!</h1>
                <p className="text-blue-100 mt-1">Let's personalize your experience</p>
              </div>
              <div className="text-right">
                <div className="text-white text-sm font-medium">
                  {currentStep + 1} of {questions.length}
                </div>
                <div className="w-32 bg-white bg-opacity-20 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {currentQuestion.title}
              </h2>
              <p className="text-gray-600 text-lg font-sans ">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Question Input */}
            <div className="max-w-md mx-auto">
              {currentQuestion.type === 'input' && (
                <input
                  type="text"
                  value={formData[currentQuestion.id]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-6 py-4 text-lg font-sans  border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  autoFocus
                />
              )}

              {currentQuestion.type === 'select' && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const value = typeof option === 'string' ? option : option.value;
                    const label = typeof option === 'string' ? option : option.label;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleInputChange(value)}
                        className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                          formData[currentQuestion.id] === value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg font-sans  font-medium">{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-8 py-3 text-gray-600 font-medium rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!formData[currentQuestion.id] || isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Setting up...
                  </div>
                ) : currentStep === questions.length - 1 ? (
                  'Complete Setup'
                ) : (
                  'Next'
                )}
              </button>
            </div>

            {/* Skip Option */}
            <div className="text-center mt-6">
              <button
                onClick={() => navigate('/create-resume')}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-sans  font-medium text-blue-900">Quick Setup Tips</h3>
              <p className="mt-1 text-blue-700">
                This questionnaire helps us personalize your resume templates and suggest relevant content. 
                You can always update these preferences later in your profile settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
