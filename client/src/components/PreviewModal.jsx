import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATES } from './templates';

const PreviewModal = ({ template, onClose, onPrev, onNext, onDownload }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const { personalInfo, education, experience, skills, projects, certifications, achievements } = template;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${template.name}`}
    >
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
            const SelectedTemplateComponent = TEMPLATES.find(tpl => tpl.id === template.id)?.component;
            return SelectedTemplateComponent ? (
              <SelectedTemplateComponent data={template} />
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
