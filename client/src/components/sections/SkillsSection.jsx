import React from 'react';
import { useController } from 'react-hook-form';

const SkillsSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          + Add Skill
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No skills added yet. Click "Add Skill" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  {...useController({
                    name: `skills.${index}.skill`,
                    control,
                    rules: { required: 'Skill is required' }
                  }).field}
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.skills?.[index]?.skill ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., JavaScript, Python, Project Management"
                />
                {errors.skills?.[index]?.skill && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.skills[index].skill.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-600 hover:text-red-800 p-2"
                title="Remove skill"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for listing skills:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include both technical and soft skills</li>
          <li>• Be specific (e.g., "React.js" instead of just "JavaScript")</li>
          <li>• List skills relevant to your target job</li>
          <li>• Consider grouping by category (Programming, Tools, Languages)</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsSection;
