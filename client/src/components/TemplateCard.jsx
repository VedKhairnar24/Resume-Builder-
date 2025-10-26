import React from 'react';
import { Link } from 'react-router-dom';

const TemplateCard = ({ template, onPreview }) => {
  return (
    <article
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onClick={() => onPreview(template.id)}
      aria-label={`Preview ${template.name}`}
    >
      {/* Template Image */}
      <div className="relative overflow-hidden">
        <img
          src={template.image}
          alt={template.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            template.color === 'blue' ? 'bg-blue-500' :
            template.color === 'purple' ? 'bg-purple-500' :
            template.color === 'gray' ? 'bg-gray-500' :
            template.color === 'indigo' ? 'bg-indigo-500' :
            template.color === 'pink' ? 'bg-pink-500' :
            'bg-green-500'
          }`}>
            {template.category}
          </span>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{template.description}</p>
        
        <div className="flex items-center justify-between">
          <button className="text-teal-500 font-semibold text-sm hover:text-teal-600 transition-colors">
            Preview Template
          </button>
          <Link
            to={`/create-resume?template=${template.id}`}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Use Template
          </Link>
        </div>
      </div>
    </article>
  );
};

export default TemplateCard;