import React from 'react';
import { useController } from 'react-hook-form';

const AchievementsSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Achievement</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No achievements added yet. Click "Add Achievement" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-sans  font-medium text-gray-900">
                  Achievement #{index + 1}
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
                {/* Achievement Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Achievement Title *
                  </label>
                  <input
                    {...useController({
                      name: `achievements.${index}.title`,
                      control,
                      rules: { required: 'Achievement title is required' }
                    }).field}
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.achievements?.[index]?.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Employee of the Year 2023"
                  />
                  {errors.achievements?.[index]?.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.achievements[index].title.message}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    {...useController({
                      name: `achievements.${index}.date`,
                      control,
                      rules: { required: 'Date is required' }
                    }).field}
                    type="month"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.achievements?.[index]?.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.achievements?.[index]?.date && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.achievements[index].date.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...useController({
                      name: `achievements.${index}.description`,
                      control,
                      rules: { required: 'Description is required' }
                    }).field}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.achievements?.[index]?.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe the achievement, its significance, and any measurable impact..."
                  />
                  {errors.achievements?.[index]?.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.achievements[index].description.message}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Include context, impact, and any recognition received.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900 mb-2">💡 Achievement tips:</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Include awards, recognitions, and notable accomplishments</li>
          <li>• Quantify impact when possible (e.g., "Led team of 10 developers")</li>
          <li>• Highlight achievements relevant to your target role</li>
          <li>• Include both professional and academic achievements</li>
        </ul>
      </div>
    </div>
  );
};

export default AchievementsSection;
