import React from 'react';
import ResumeTemplateOne from './templates/ResumeTemplateOne';
import ResumeTemplateTwo from './templates/ResumeTemplateTwo';
import ResumeTemplateThree from './templates/ResumeTemplateThree';

const TEMPLATES = [
  { 
    id: 'one', 
    name: 'Classic', 
    description: 'Traditional format with clean lines and professional styling',
    component: ResumeTemplateOne,
    preview: 'bg-white border-2 border-gray-300'
  },
  { 
    id: 'two', 
    name: 'Modern', 
    description: 'Contemporary design with colors and icons',
    component: ResumeTemplateTwo,
    preview: 'bg-gradient-to-r from-purple-600 to-blue-600'
  },
  { 
    id: 'three', 
    name: 'Minimal', 
    description: 'Clean and simple design with focus on typography',
    component: ResumeTemplateThree,
    preview: 'bg-white border border-gray-400'
  },
];

const TemplateSelector = ({ selectedTemplate, onTemplateChange, resumeData }) => {
  const SelectedTemplateComponent = TEMPLATES.find(tpl => tpl.id === selectedTemplate)?.component;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Resume Template</h2>
      
      {/* Template Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className="text-center">
              <div className={`w-full h-20 rounded mb-3 ${template.preview}`}></div>
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
            {selectedTemplate === template.id && (
              <div className="mt-3 text-center">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Selected
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Live Preview */}
      {/* <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 ml-2">Resume Preview</span>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {SelectedTemplateComponent && (
              <SelectedTemplateComponent data={resumeData} />
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TemplateSelector;
