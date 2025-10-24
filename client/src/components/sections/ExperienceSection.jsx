import React from 'react';
import { useController } from 'react-hook-form';

const ExperienceSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Work Experience</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          + Add Experience
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience entries yet. Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Experience Entry #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience?.[index]?.position ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience?.[index]?.company ? 'border-red-500' : 'border-gray-300'
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience?.[index]?.startDate ? 'border-red-500' : 'border-gray-300'
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.experience?.[index]?.description ? 'border-red-500' : 'border-gray-300'
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
