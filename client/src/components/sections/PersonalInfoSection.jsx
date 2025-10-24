import React from 'react';
import { useController } from 'react-hook-form';

const PersonalInfoSection = ({ control, errors }) => {
  const { field: nameField } = useController({
    name: 'personalInfo.name',
    control,
    rules: { required: 'Name is required' }
  });

  const { field: emailField } = useController({
    name: 'personalInfo.email',
    control,
    rules: { 
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    }
  });

  const { field: phoneField } = useController({
    name: 'personalInfo.phone',
    control,
    rules: { required: 'Phone number is required' }
  });

  const { field: addressField } = useController({
    name: 'personalInfo.address',
    control
  });

  const { field: linkedinField } = useController({
    name: 'personalInfo.linkedin',
    control
  });

  const { field: websiteField } = useController({
    name: 'personalInfo.website',
    control
  });

  const { field: summaryField } = useController({
    name: 'personalInfo.summary',
    control
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            {...nameField}
            type="text"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.personalInfo?.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.personalInfo?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.personalInfo.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            {...emailField}
            type="email"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.personalInfo?.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.personalInfo?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.personalInfo.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            {...phoneField}
            type="tel"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.personalInfo?.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.personalInfo?.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.personalInfo.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            {...addressField}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City, State, Country"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            {...linkedinField}
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Website
          </label>
          <input
            {...websiteField}
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <textarea
          {...summaryField}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a brief summary of your professional background and career objectives..."
        />
        <p className="mt-1 text-sm text-gray-500">
          A compelling summary helps recruiters understand your value proposition quickly.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
