import React, { useState, useEffect } from 'react';

const PasswordStrengthIndicator = ({ password, onStrengthChange }) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback([]);
      onStrengthChange?.(0);
      return;
    }

    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    };

    const strengthScore = Object.values(checks).filter(Boolean).length;
    setStrength(strengthScore);

    const feedbackItems = [];
    if (!checks.length) feedbackItems.push('At least 8 characters');
    if (!checks.lowercase) feedbackItems.push('One lowercase letter');
    if (!checks.uppercase) feedbackItems.push('One uppercase letter');
    if (!checks.number) feedbackItems.push('One number');
    if (!checks.special) feedbackItems.push('One special character (@$!%*?&)');

    setFeedback(feedbackItems);
    onStrengthChange?.(strengthScore);

  }, [password, onStrengthChange]);

  const getStrengthColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength <= 1) return 'Very Weak';
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {getStrengthText()}
        </span>
      </div>
      
      {feedback.length > 0 && (
        <div className="text-sm text-gray-600">
          <p className="mb-1">Password must contain:</p>
          <ul className="list-disc list-inside space-y-1">
            {feedback.map((item, index) => (
              <li key={index} className="text-red-600">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
