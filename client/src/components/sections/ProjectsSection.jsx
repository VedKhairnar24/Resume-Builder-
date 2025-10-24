import React from 'react';
import { useController } from 'react-hook-form';

const ProjectsSection = ({ control, errors, fields, onAdd, onRemove }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          + Add Project
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No projects added yet. Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Project #{index + 1}
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
