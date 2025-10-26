import React from 'react';
import { useController } from 'react-hook-form';

const CertificationsSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Certification</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <p className="text-lg font-medium">No certifications added yet</p>
          <p className="text-sm">Click "Add Certification" to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Certification #{index + 1}
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
                {/* Certification Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certification Title *
                  </label>
                  <input
                    {...useController({
                      name: `certifications.${index}.title`,
                      control,
                      rules: { required: 'Certification title is required' }
                    }).field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.certifications?.[index]?.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., AWS Certified Solutions Architect"
                  />
                  {errors.certifications?.[index]?.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.certifications[index].title.message}
                    </p>
                  )}
                </div>

                {/* Issuing Organization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issuing Organization *
                  </label>
                  <input
                    {...useController({
                      name: `certifications.${index}.issuer`,
                      control,
                      rules: { required: 'Issuing organization is required' }
                    }).field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.certifications?.[index]?.issuer ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Amazon Web Services"
                  />
                  {errors.certifications?.[index]?.issuer && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.certifications[index].issuer.message}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Obtained *
                  </label>
                  <input
                    {...useController({
                      name: `certifications.${index}.date`,
                      control,
                      rules: { required: 'Date is required' }
                    }).field}
                    type="month"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.certifications?.[index]?.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.certifications?.[index]?.date && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.certifications[index].date.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h3 className="text-sm font-medium text-purple-900 mb-2">💡 Certification tips:</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Include industry-recognized certifications</li>
          <li>• List certifications relevant to your field</li>
          <li>• Include expiration dates if applicable</li>
          <li>• Consider adding credential IDs or verification links</li>
        </ul>
      </div>
    </div>
  );
};

export default CertificationsSection;
