import React from 'react';
import { Link } from 'react-router-dom';

const TemplateCard = ({ template, onPreview }) => {
  return (
    <article
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-250 overflow-hidden cursor-pointer"
      onClick={() => onPreview(template.id)}
      aria-label={`Preview ${template.name}`}
    >
      {/* Card content from your original code */}
    </article>
  );
};

export default TemplateCard;