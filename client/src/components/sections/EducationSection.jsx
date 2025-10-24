import React from 'react';
import { useController } from 'react-hook-form';

const EducationSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          + Add Education
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No education entries yet. Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Education Entry #{index + 1}
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
                {/* Degree */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree *
                  </label>
                  <input
                    {...useController({
                      name: `education.${index}.degree`,
                      control,
                      rules: { required: 'Degree is required' }
                    }).field}
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.education?.[index]?.degree ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Bachelor of Science"
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education[index].degree.message}
                    </p>
                  )}
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  <input
                    {...useController({
                      name: `education.${index}.institution`,
                      control,
                      rules: { required: 'Institution is required' }
                    }).field}
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.education?.[index]?.institution ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., University of California"
                  />
                  {errors.education?.[index]?.institution && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education[index].institution.message}
                    </p>
                  )}
                </div>

                {/* Field of Study */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study
                  </label>
                  <input
                    {...useController({
                      name: `education.${index}.field`,
                      control
                    }).field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Computer Science"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    {...useController({
                      name: `education.${index}.startDate`,
                      control,
                      rules: { required: 'Start date is required' }
                    }).field}
                    type="month"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.education?.[index]?.startDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.education?.[index]?.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education[index].startDate.message}
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
                      name: `education.${index}.endDate`,
                      control
                    }).field}
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave empty if currently studying
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...useController({
                      name: `education.${index}.description`,
                      control
                    }).field}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Relevant coursework, achievements, GPA, etc."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationSection;
