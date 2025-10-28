import React from 'react';

const ResumeTemplateFour = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto" style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
      {/* Left sidebar layout */}
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-1/3 bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{personalInfo?.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mt-1">{personalInfo?.title}</p>
          </div>

          <div className="text-sm text-gray-700 space-y-2">
            {personalInfo?.email && <p>✉️ {personalInfo.email}</p>}
            {personalInfo?.phone && <p>📞 {personalInfo.phone}</p>}
            {personalInfo?.location && <p>📍 {personalInfo.location}</p>}
            {personalInfo?.linkedin && (
              <p><a href={personalInfo.linkedin} className="text-blue-600">LinkedIn</a></p>
            )}
            {personalInfo?.website && (
              <p><a href={personalInfo.website} className="text-blue-600">Website</a></p>
            )}
          </div>

          {skills && skills.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{s.skill}</span>
                ))}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Certifications</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                {certifications.map((c, i) => (
                  <li key={i}>{c.title} · <span className="text-gray-500">{c.issuer}</span></li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {personalInfo?.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile</h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}

          {experience && experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</div>
                  </div>
                  {exp.description && <p className="text-gray-700 mt-2 whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education && education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-gray-500">{edu.startDate} - {edu.endDate || 'Present'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {projects && projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
              {projects.map((p, idx) => (
                <div key={idx} className="mb-3">
                  <h3 className="font-medium text-gray-900">{p.title}</h3>
                  {p.techUsed && <p className="text-sm text-gray-600">{p.techUsed}</p>}
                  {p.description && <p className="text-gray-700 mt-1">{p.description}</p>}
                </div>
              ))}
            </div>
          )}

          {achievements && achievements.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
              {achievements.map((a, idx) => (
                <div key={idx} className="mb-3">
                  <h4 className="font-medium text-gray-900">{a.title}</h4>
                  {a.description && <p className="text-gray-700 text-sm">{a.description}</p>}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResumeTemplateFour;
