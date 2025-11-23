import React, { useState } from "react";

const TemplateSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const templates = [
    {
      img: "../img/Classic Resume.png",
      title: "Classic Resume",
    },
    {
      img: "../img/Modern Resume.png",
      title: "Modern Resume",
    },
    {
      img: "../img/Minimal Resume.png",
      title: "Minimal Resume",
    },
    {
      img: "../img/Executive Resume.png",
      title: "executive Resume",
    },
    {
      img: "../img/Creative Resume.jpg",
      title: "creative Resume",
    },
    {
      img: "../img/Tech Resume.png",
      title: "Tech Resume",
    },
  ];

  return (
    <section className="py-24 text-center relative overflow-hidden bg-white font-sans">
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          data-aos="fade-up"
        >
          Stunning <span className="text-teal-500">Templates</span>
        </h2>
        <p
          className="text-lg font-sans  text-gray-600 mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Pick a professional design that fits your style and career goals.
        </p>

        {/* Template Gallery */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-0"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {templates.map((template, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(template.img)}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white cursor-pointer"
            >
              <img
                src={template.img}
                alt={template.title}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-left">
                <h3 className="text-white text-lg font-sans  font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {template.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="300">
          <button className="px-8 py-3 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-colors duration-300 shadow-md">
            Explore More Templates
          </button>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl mx-auto px-4">
            <img
              src={selectedImage}
              alt="Template Preview"
              className="rounded-xl max-h-[85vh] w-auto shadow-2xl border border-gray-200"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TemplateSection;
