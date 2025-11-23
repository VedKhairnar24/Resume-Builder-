import React from 'react';
import { useController } from 'react-hook-form';

const ExperienceSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Experience</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <p className="text-lg font-sans  font-medium">No work experience entries yet</p>
          <p className="text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-sans  font-semibold text-gray-900">
                  Experience #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    {...useController({
                      name: `experience.${index}.position`,
                      control,
                      rules: { required: 'Job title is required' }
                    }).field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${errors.experience?.[index]?.position ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="e.g., Software Engineer"
                  />
                  {errors.experience?.[index]?.position && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience[index].position.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    {...useController({
                      name: `experience.${index}.company`,
                      control,
                      rules: { required: 'Company is required' }
                    }).field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${errors.experience?.[index]?.company ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="e.g., Google Inc."
                  />
                  {errors.experience?.[index]?.company && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience[index].company.message}
                    </p>
                  )}
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    {...useController({
                      name: `experience.${index}.startDate`,
                      control,
                      rules: { required: 'Start date is required' }
                    }).field}
                    type="month"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${errors.experience?.[index]?.startDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.experience?.[index]?.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience[index].startDate.message}
                    </p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    {...useController({
                      name: `experience.${index}.endDate`,
                      control
                    }).field}
                    type="month"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty if currently working
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    {...useController({
                      name: `experience.${index}.description`,
                      control,
                      rules: { required: 'Job description is required' }
                    }).field}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${errors.experience?.[index]?.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Describe your key responsibilities, achievements, and impact in this role..."
                  />
                  {errors.experience?.[index]?.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience[index].description.message}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Use bullet points and quantify your achievements when possible.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
