import React from 'react';
import { TEMPLATES } from './templates';

const PreviewModal = ({ data, selectedTemplate, onClose }) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {(() => {
            const SelectedTemplateComponent = TEMPLATES.find(tpl => tpl.id === selectedTemplate)?.component;
            return SelectedTemplateComponent ? (
              <SelectedTemplateComponent data={data} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No template selected</p>
              </div>
            );
          })()}
        </div>

        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
