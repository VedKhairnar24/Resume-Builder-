import React from 'react';

const ResumeTemplateTwo = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header with colored background */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {personalInfo?.email && <p>📧 {personalInfo.email}</p>}
          {personalInfo?.phone && <p>📱 {personalInfo.phone}</p>}
          {personalInfo?.address && <p>📍 {personalInfo.address}</p>}
          {personalInfo?.linkedin && (
            <p>
              <a href={personalInfo.linkedin} className="text-white hover:underline">
                🔗 LinkedIn Profile
              </a>
            </p>
          )}
          {personalInfo?.website && (
            <p>
              <a href={personalInfo.website} className="text-white hover:underline">
                🌐 Personal Website
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
            <span className="bg-purple-100 p-2 rounded-full mr-3">💼</span>
            Professional Summary
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-3">💼</span>
                Work Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6 border-l-4 border-purple-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-sans  font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-purple-600 font-medium">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-3">🎓</span>
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 border-l-4 border-purple-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-sans  font-semibold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-purple-600">{edu.institution}</p>
                    </div>
                    <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </p>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-3">🚀</span>
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-sans  font-semibold text-gray-900">{project.title}</h3>
                  {project.link && (
                    <p className="text-purple-600 mb-2">
                      <a href={project.link} className="hover:underline">🔗 View Project</a>
                    </p>
                  )}
                  {project.techUsed && (
                    <p className="text-sm text-gray-500 mb-2">
                      <strong>Technologies:</strong> {project.techUsed}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-gray-700">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-2">⚡</span>
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg text-sm">
                    {skill.skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-2">🏆</span>
                Certifications
              </h2>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-3 bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-gray-900 text-sm">{cert.title}</h3>
                  <p className="text-gray-600 text-xs">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs">{cert.date}</p>
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-full mr-2">⭐</span>
                Achievements
              </h2>
              {achievements.map((achievement, index) => (
                <div key={index} className="mb-3 bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold text-gray-900 text-sm">{achievement.title}</h3>
                  <p className="text-gray-500 text-xs mb-1">{achievement.date}</p>
                  {achievement.description && (
                    <p className="text-gray-700 text-xs">{achievement.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateTwo;
