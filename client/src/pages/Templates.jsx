import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import TemplateCard from '../components/TemplateCard';
import PreviewModal from '../components/PreviewModal';

export const TEMPLATES = [
  {
    id: "classic",
    name: "Classic Resume",
    image: "../img/Classic Resume.png",
    description: "Clean layout focused on content hierarchy and readability.",
    category: "Professional",
    color: "blue"
  },
  {
    id: "modern",
    name: "Modern Resume",
    image: "../img/Modern Resume.png",
    description: "Contemporary design with colors and modern typography.",
    category: "Modern",
    color: "purple"
  },
  {
    id: "minimal",
    name: "Minimal Resume",
    image: "../img/Minimal Resume.png",
    description: "Clean and simple design with focus on typography.",
    category: "Minimalist",
    color: "gray"
  },
  {
    id: "executive",
    name: "Executive Resume",
    image: "../img/Executive Resume.png",
    description: "Professional format perfect for senior positions.",
    category: "Executive",
    color: "indigo"
  },
  {
    id: "creative",
    name: "Creative Resume",
    image: "../img/Creative Resume.jpg",
    description: "Eye-catching design for creative professionals.",
    category: "Creative",
    color: "pink"
  },
  {
    id: "tech",
    name: "Tech Resume",
    image: "../img/Tech Resume.png",
    description: "Modern layout optimized for tech professionals.",
    category: "Technology",
    color: "green"
  }
];

const TemplatesPage = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [filtered, setFiltered] = useState(TEMPLATES);
  const navigate = useNavigate();

  const categories = ["all", ...new Set(TEMPLATES.map(t => t.category))];

  useEffect(() => {
    let filteredTemplates = TEMPLATES;

    // Filter by category
    if (selectedCategory !== "all") {
      filteredTemplates = filteredTemplates.filter(t => t.category === selectedCategory);
    }

    // Filter by search query
    const q = query.trim().toLowerCase();
    if (q) {
      filteredTemplates = filteredTemplates.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }

    setFiltered(filteredTemplates);
  }, [query, selectedCategory]);

  const openPreview = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const closePreview = useCallback(() => {
    setSelectedId(null);
  }, []);

  const currentIndex = TEMPLATES.findIndex((t) => t.id === selectedId);
  const currentTemplate = currentIndex >= 0 ? TEMPLATES[currentIndex] : null;

  const prevTemplate = useCallback(() => {
    if (currentIndex <= 0) return;
    setSelectedId(TEMPLATES[currentIndex - 1].id);
  }, [currentIndex]);

  const nextTemplate = useCallback(() => {
    if (currentIndex === -1 || currentIndex >= TEMPLATES.length - 1) return;
    setSelectedId(TEMPLATES[currentIndex + 1].id);
  }, [currentIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (!selectedId) return;
      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowLeft") prevTemplate();
      if (e.key === "ArrowRight") nextTemplate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, closePreview, prevTemplate, nextTemplate]);

  const handleDownload = async (imageUrl) => {
    try {
      const a = document.createElement("a");
      a.href = imageUrl;
      const name = imageUrl.split("/").pop().split("?")[0] || "template.png";
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Stunning <span className="text-teal-500">Templates</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Choose from our collection of professionally designed resume templates. 
            Pick a template, preview it, and start building your resume instantly.
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search templates..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Templates' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-500 mb-6">
            Showing {filtered.length} template{filtered.length !== 1 ? 's' : ''}
            {query && ` for "${query}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Templates Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filtered.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                onClick={() => openPreview(template.id)}
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 4c-2.34 0-4.29 1.009-5.824 2.709" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria to find more templates.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory("all");
              }}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your Resume?</h2>
          <p className="text-lg mb-6 opacity-90">
            Choose any template and start building your professional resume in minutes.
          </p>
          <Link
            to="/create-resume"
            className="bg-white text-teal-500 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Start Building Now
          </Link>
        </div>
      </div>

      {/* Preview Modal */}
      {currentTemplate && (
        <PreviewModal
          template={currentTemplate}
          onClose={closePreview}
          onPrev={prevTemplate}
          onNext={nextTemplate}
          onDownload={handleDownload}
        />
      )}
    </main>
  );
};

export default TemplatesPage;