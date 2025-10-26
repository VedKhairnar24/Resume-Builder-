import React from 'react';
import { useController } from 'react-hook-form';

const SkillsSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Skill</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-lg font-medium">No skills added yet</p>
          <p className="text-sm">Click "Add Skill" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex-1">
                <input
                  {...useController({
                    name: `skills.${index}.skill`,
                    control,
                    rules: { required: 'Skill is required' }
                  }).field}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
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
                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
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

      <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-200">
        <h3 className="text-sm font-medium text-teal-900 mb-2">💡 Tips for listing skills:</h3>
        <ul className="text-sm text-teal-800 space-y-1">
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
