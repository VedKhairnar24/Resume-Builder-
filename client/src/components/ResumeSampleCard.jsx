import React from "react";
import "../styles/Home.css";

const ResumeSampleCard = ({ highlight = false }) => {
  return (
    <article
      className={`resume-card-modern ${
        highlight ? "highlight" : ""
      } bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 transition-all duration-300 hover:shadow-lg`}
    >
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Arjun Mehta</h2>
          <p className="text-gray-500 text-sm">
            Software Engineer • Full Stack Developer
          </p>
        </div>
        <div className="mt-3 md:mt-0 text-sm text-gray-500 space-y-1 text-right">
          <p>📧 arjun.mehta@email.com</p>
          <p>📞 +91 98765 43210</p>
          <p>🌐 arjunmehta.dev</p>
          <p>📍 Mumbai, India</p>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h3 className="section-title">Summary</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Passionate developer focused on building clean, fast, and scalable
          applications. Experienced in React and Node.js with an eye for design
          and performance optimization.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h3 className="section-title">Experience</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-800">Frontend Developer</strong>
              <span className="text-gray-400 text-sm">2023–Present</span>
            </div>
            <p className="text-gray-500 text-sm">PixelCorp</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-1 space-y-1">
              <li>Developed dashboards with React & Redux, improving speed by 30%.</li>
              <li>Integrated APIs and optimized UI responsiveness.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <strong className="text-gray-800">Software Intern</strong>
              <span className="text-gray-400 text-sm">2022–2023</span>
            </div>
            <p className="text-gray-500 text-sm">InnovateX Labs</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-1 space-y-1">
              <li>Built RESTful APIs with Node.js and Express.</li>
              <li>Contributed to test automation and documentation.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h3 className="section-title">Education</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 text-sm">
            B.Tech, Computer Science — IIT Bombay
          </p>
          <span className="text-gray-400 text-sm">2019–2023</span>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h3 className="section-title">Skills</h3>
        <div className="flex flex-wrap gap-2 text-sm text-gray-700">
          {[
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Node.js",
            "MongoDB",
            "Git",
            "Figma",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h3 className="section-title">Projects</h3>
        <div>
          <strong className="text-gray-800">TaskPilot</strong>
          <p className="text-gray-600 text-sm mt-1">
            Full-stack productivity app built with the MERN stack featuring JWT
            auth and real-time task updates.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-100 pt-4 text-center text-xs text-gray-400">
        “Code. Create. Simplify.”
      </footer>
    </article>
  );
};

export default ResumeSampleCard;
