import React from 'react';

const ResumeTemplateFive = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white p-10 max-w-4xl mx-auto" style={{ fontFamily: '"Merriweather", serif' }}>
      {/* Color-accent header */}
      <div className="mb-8 border-l-4 border-teal-500 pl-4">
        <h1 className="text-4xl font-bold text-teal-700">{personalInfo?.name || 'Your Name'}</h1>
        <p className="text-sm text-teal-600 mt-1">{personalInfo?.title}</p>
      </div>

      {personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {experience && experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Experience</h2>
              {experience.map((e, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-semibold text-gray-900">{e.position} <span className="text-sm text-gray-500">@ {e.company}</span></h3>
                  <p className="text-sm text-gray-500">{e.startDate} - {e.endDate || 'Present'}</p>
                  {e.description && <p className="text-gray-700 mt-1">{e.description}</p>}
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Projects</h2>
              {projects.map((p, i) => (
                <div key={i} className="mb-3">
                  <h4 className="font-medium text-gray-900">{p.title}</h4>
                  {p.techUsed && <p className="text-sm text-gray-500">{p.techUsed}</p>}
                  {p.description && <p className="text-gray-700">{p.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {education && education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <h4 className="font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                  <p className="text-sm text-gray-500">{edu.institution} · {edu.startDate} - {edu.endDate || 'Present'}</p>
                </div>
              ))}
            </div>
          )}

          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, idx) => (
                  <span key={idx} className="bg-teal-100 text-teal-800 px-3 py-1 rounded text-xs">{s.skill}</span>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Certifications</h2>
              <ul className="text-sm text-gray-600 space-y-1">
                {certifications.map((c, i) => (
                  <li key={i}>{c.title} — <span className="text-gray-500">{c.issuer}</span></li>
                ))}
              </ul>
            </div>
          )}

          {achievements && achievements.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Achievements</h2>
              {achievements.map((a, i) => (
                <div key={i} className="mb-2">
                  <p className="text-gray-900 font-medium">{a.title}</p>
                  {a.description && <p className="text-sm text-gray-700">{a.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateFive;
