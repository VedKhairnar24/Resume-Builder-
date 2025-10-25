import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import TemplateCard from '../components/TemplateCard';
import PreviewModal from '../components/PreviewModal';

export const TEMPLATES = [
  {
    id: "classic",
    name: "Classic Resume",
    image: "https://cdn.pixabay.com/photo/2016/10/27/22/52/resume-1773728_1280.png",
    description: "Clean layout focused on content hierarchy and readability.",
  },
  // ...other templates as shown in your code
];

const TemplatesPage = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [filtered, setFiltered] = useState(TEMPLATES);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setFiltered(TEMPLATES);
      return;
    }
    setFiltered(
      TEMPLATES.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      )
    );
  }, [query]);

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
      {/* Content as shown in your code */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-10 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Stunning <span className="text-teal-500">Templates</span>
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Pick a template and preview it full size. Use the template to start
            building your resume instantly.
          </p>
        </header>

        {/* Search + CTA */}
        {/* ... rest of your JSX code ... */}
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