import React, { useEffect } from 'react';
import { TEMPLATES } from './templates';

const PreviewModal = ({ data, selectedTemplate, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const SelectedTemplateComponent = TEMPLATES.find(t => t.id === selectedTemplate)?.component;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-label="Resume Preview"
    >
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Template: {TEMPLATES.find(t => t.id === selectedTemplate)?.name || 'Classic'}
            </span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-120px)]">
          {SelectedTemplateComponent ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
              <SelectedTemplateComponent data={data} />
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 4c-2.34 0-4.29-1.009-5.824 2.709"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No template selected</p>
              <p className="text-gray-400 text-sm mt-2">Please select a template to preview your resume</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="bg-teal-500 text-white px-8 py-3 rounded-xl hover:bg-teal-600 transition-colors font-semibold shadow-sm"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
