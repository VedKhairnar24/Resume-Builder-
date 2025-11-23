import React from 'react';

const ResumeTemplateOne = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-blue-600 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <div className="text-gray-600 space-y-1">
          {personalInfo?.email && <p>{personalInfo.email}</p>}
          {personalInfo?.phone && <p>{personalInfo.phone}</p>}
          {personalInfo?.address && <p>{personalInfo.address}</p>}
          {personalInfo?.linkedin && (
            <p>
              <a href={personalInfo.linkedin} className="text-blue-600">
                LinkedIn Profile
              </a>
            </p>
          )}
          {personalInfo?.website && (
            <p>
              <a href={personalInfo.website} className="text-blue-600">
                Personal Website
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-1">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-sans  font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-500">
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

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-1">
            Work Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-sans  font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
              </div>
              {exp.description && (
                <p className="text-gray-700 mt-2 whitespace-pre-line">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill.skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-1">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-sans  font-semibold text-gray-900">{project.title}</h3>
              {project.link && (
                <p className="text-blue-600 mb-2">
                  <a href={project.link}>View Project</a>
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

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-1">
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-lg font-sans  font-semibold text-gray-900">{cert.title}</h3>
              <p className="text-gray-600">{cert.issuer}</p>
              <p className="text-sm text-gray-500">{cert.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b border-blue-600 pb-1">
            Achievements
          </h2>
          {achievements.map((achievement, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-sans  font-semibold text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{achievement.date}</p>
              {achievement.description && (
                <p className="text-gray-700">{achievement.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeTemplateOne;
