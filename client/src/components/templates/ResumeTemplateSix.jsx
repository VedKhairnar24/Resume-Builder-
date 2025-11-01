import React from 'react';

const ResumeTemplateSix = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      {/* Split header with name and contact */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{personalInfo?.name || 'Your Name'}</h1>
          <p className="text-sm text-gray-600">{personalInfo?.title}</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          {personalInfo?.email && <div>{personalInfo.email}</div>}
          {personalInfo?.phone && <div>{personalInfo.phone}</div>}
          {personalInfo?.linkedin && <div><a href={personalInfo.linkedin} className="text-blue-600">LinkedIn</a></div>}
        </div>
      </div>

      {personalInfo?.summary && (
        <div className="mb-6 bg-gray-50 p-4 rounded">
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {experience && experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Experience</h2>
              {experience.map((e, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{e.position}</h3>
                      <p className="text-sm text-gray-600">{e.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">{e.startDate} - {e.endDate || 'Present'}</div>
                  </div>
                  {e.description && <p className="text-gray-700 mt-2">{e.description}</p>}
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
                  {p.description && <p className="text-sm text-gray-700">{p.description}</p>}
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
                  <p className="text-sm text-gray-600">{edu.institution} · {edu.startDate} - {edu.endDate || 'Present'}</p>
                </div>
              ))}
            </div>
          )}

          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">{s.skill}</span>
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

export default ResumeTemplateSix;
