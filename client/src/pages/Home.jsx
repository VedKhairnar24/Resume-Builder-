import React from 'react';
import ResumeSampleCard from '../components/ResumeSampleCard';
import TemplateCarousel from '../components/TemplateCarousel';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-32 text-center bg-gradient-to-b from-gray-50 via-white to-teal-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-6" data-aos="fade-down">
            ⚡️ The Smart Way to Build Your Resume
          </span>
          
          <h1
            className="text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight"
            data-aos="fade-up"
          >
            Build a Resume That
            <span className="block bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Gets You Hired
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
            Create a professional resume in minutes with our AI-powered builder, 
            ATS-friendly templates, and expert-approved designs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="200">
            <a
              href="/create-resume"
              className="inline-flex items-center bg-teal-500 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:bg-teal-600 hover:scale-105 transition-all duration-300"
            >
              Create Your Resume <span className="ml-2">→</span>
            </a>
            <a
              href="/templates"
              className="inline-flex items-center bg-white text-gray-700 font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 border border-gray-200"
            >
              View Templates
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-12" data-aos="fade-up" data-aos-delay="300">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Free Forever
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              ATS-Friendly
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              Privacy Protected
            </span>
          </div>

        </div>
      </header>
     
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
  <div className="max-w-6xl mx-auto px-6">
    <h2
      className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-14 tracking-tight"
      data-aos="fade-up"
    >
      Why Choose <span className="text-teal-500">Our Resume Builder?</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Card 1 */}
      <div
        className="group text-center p-10 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
            <svg
              className="w-12 h-12 text-teal-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L15 8l6 .5-4.5 3.5L18 20l-6-3.5L6 20l1.5-8L3 8.5 9 8z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Sleek Templates
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Choose from modern, ATS-optimized designs that grab attention and
          highlight your strengths.
        </p>
      </div>

      {/* Card 2 */}
      <div
        className="group text-center p-10 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
            <svg
              className="w-12 h-12 text-teal-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3h18v4H3zM3 9h12v12H3z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Effortless Editing
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Make quick updates with live preview and instant autosave—no more
          losing your progress.
        </p>
      </div>

      {/* Card 3 */}
      <div
        className="group text-center p-10 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
            <svg
              className="w-12 h-12 text-teal-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v10l3-3 5 7H4l5-7 3 3V2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Clean PDF Export
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Instantly download pixel-perfect resumes in professional PDF format,
          ready to share anywhere.
        </p>
      </div>
    </div>

    {/* Bottom highlight */}
    <div
      className="text-center mt-16"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <p className="text-gray-700 text-lg">
        Designed to make your <span className="text-teal-500 font-medium">resume shine</span> — fast, simple, and
        professional.
      </p>
    </div>
  </div>
</section>


      <section className="py-24 text-center">
        <div className="max-w-6xl mx-auto px-6" data-aos="fade-up" data-aos-delay="200">
          <TemplateCarousel />
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white text-center relative overflow-hidden">
  {/* Decorative background blur */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-20 -z-10"></div>

  <div className="max-w-6xl mx-auto px-6 relative">
    {/* Heading */}
    <h2
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
      data-aos="fade-up"
    >
      Build Your <span className="text-teal-500">Resume</span> Step by Step
    </h2>

    {/* Steps Grid */}
    <div
      className="grid grid-cols-1 md:grid-cols-4 gap-8"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {[
        {
          step: 1,
          title: "Choose Template",
          desc: "Pick a layout that fits your professional style.",
        },
        {
          step: 2,
          title: "Add Information",
          desc: "Fill details like personal info, education, and work experience.",
        },
        {
          step: 3,
          title: "Preview Live",
          desc: "See instant updates while you edit your resume.",
        },
        {
          step: 4,
          title: "Download PDF",
          desc: "Export your final resume in one click.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="p-8 text-left bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay={100 * (index + 1)}
        >
          <span className="inline-block w-10 h-10 text-center leading-10 bg-teal-500 text-white rounded-full font-bold mb-4">
            {item.step}
          </span>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            {item.title}
          </h3>
          <p className="text-base text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* Detailed Sections */}
    <div
      className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 text-left"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Add Your Details
        </h3>
        <ul className="space-y-2 text-gray-600 list-disc pl-5">
          <li>Personal Information</li>
          <li>Education</li>
          <li>Work Experience</li>
          <li>Skills</li>
          <li>Projects</li>
          <li>Certifications</li>
          <li>Achievements</li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-inner flex flex-col items-center justify-center">
        <img
          src="https://cdn.pixabay.com/photo/2016/10/27/22/52/resume-1773728_1280.png"
          alt="Live Preview"
          className="w-full h-80 object-contain rounded-xl border border-gray-200 shadow-md mb-4"
        />
        <p className="text-gray-700 text-center text-lg font-medium">
          Live Preview — See your changes instantly as you build your resume.
        </p>
      </div>
    </div>
  </div>
</section>


<section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white text-center relative overflow-hidden">
  {/* Decorative background blur */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-20 -z-10"></div>

  <div className="max-w-6xl mx-auto px-6 relative">
    {/* Heading */}
    <h2
      className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
      data-aos="fade-up"
    >
      Success <span className="text-teal-500">Stories</span>
    </h2>

    {/* Testimonials */}
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-10"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {[
        {
          name: "Priya S.",
          quote:
            "I landed my dream job within weeks! The templates are modern, clean, and easy to use.",
          img: "/assets/avatar1.jpg",
          role: "Software Developer at Infosys",
        },
        {
          name: "Daniel R.",
          quote:
            "The live preview feature made resume building effortless. Got shortlisted faster than ever!",
          img: "/assets/avatar2.jpg",
          role: "UI/UX Designer at Deloitte",
        },
      ].map((person, index) => (
        <div
          key={index}
          className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-left flex flex-col items-center md:items-start"
          data-aos="fade-up"
          data-aos-delay={100 * (index + 1)}
        >
          <img
            className="w-20 h-20 rounded-full mb-5 grayscale hover:grayscale-0 transition-all duration-300 border-4 border-teal-100 shadow-sm"
            src={person.img}
            alt={person.name}
          />
          <blockquote className="text-lg text-gray-800 italic mb-4 text-center md:text-left">
            “{person.quote}”
          </blockquote>
          <div className="text-gray-900 font-semibold text-lg">
            {person.name}
          </div>
          <div className="text-gray-500 text-sm">{person.role}</div>
        </div>
      ))}
    </div>

    {/* Bottom Call-to-Action */}
    <div
      className="mt-16"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <p className="text-gray-700 mb-6 text-lg">
        Ready to start your own success story?
      </p>
      <a href="/create-resume" className="px-8 py-3 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-colors duration-300 shadow-md">
        Build Your Resume Now
      </a>
    </div>
  </div>
</section>

      <footer className="py-12 text-center border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600 mb-4">© 2025 Resume Builder</p>
        <div className="flex justify-center gap-6">
          <a href="/privacy" className="text-sm text-teal-500 hover:text-teal-600 font-medium">
            Privacy
          </a>
          <a href="/contact" className="text-sm text-teal-500 hover:text-teal-600 font-medium">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
