import React from 'react';
import { useController } from 'react-hook-form';

const ProjectsSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition-all duration-200 font-semibold shadow-sm flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add Project</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-lg font-sans  font-medium">No projects added yet</p>
          <p className="text-sm">Click "Add Project" to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-sans  font-semibold text-gray-900">
                  Project #{index + 1}
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
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    {...useController({
                      name: `projects.${index}.title`,
                      control,
                      rules: { required: 'Project title is required' }
                    }).field}
                    type="text"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.projects?.[index]?.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., E-commerce Website"
                  />
                  {errors.projects?.[index]?.title && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.projects[index].title.message}
                    </p>
                  )}
                </div>

                {/* Project Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Link
                  </label>
                  <input
                    {...useController({
                      name: `projects.${index}.link`,
                      control
                    }).field}
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                {/* Technologies Used */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies Used
                  </label>
                  <input
                    {...useController({
                      name: `projects.${index}.techUsed`,
                      control
                    }).field}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="React, Node.js, MongoDB, AWS"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate technologies with commas
                  </p>
                </div>

                {/* Project Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    {...useController({
                      name: `projects.${index}.description`,
                      control,
                      rules: { required: 'Project description is required' }
                    }).field}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                      errors.projects?.[index]?.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe what the project does, your role, key features, and any notable achievements..."
                  />
                  {errors.projects?.[index]?.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.projects[index].description.message}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Include your role, key features, challenges solved, and impact.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 className="text-sm font-medium text-green-900 mb-2">💡 Project tips:</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Include both personal and professional projects</li>
          <li>• Highlight projects that demonstrate relevant skills</li>
          <li>• Quantify your impact (e.g., "Increased user engagement by 40%")</li>
          <li>• Provide links to live demos or GitHub repositories</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsSection;
