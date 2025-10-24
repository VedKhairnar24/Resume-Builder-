import React from 'react';
import { useController } from 'react-hook-form';

const CertificationsSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Certifications</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          + Add Certification
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No certifications added yet. Click "Add Certification" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Certification #{index + 1}
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
