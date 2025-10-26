import React from 'react';
import { useController } from 'react-hook-form';

const EducationSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Education</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Education</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-lg font-medium">No education entries yet</p>
          <p className="text-sm">Click "Add Education" to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education #{index + 1}
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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
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
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
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
