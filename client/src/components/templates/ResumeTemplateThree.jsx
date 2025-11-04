import React from 'react';

const ResumeTemplateThree = ({ data }) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      {/* Minimal Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
          {personalInfo?.name || 'Your Name'}
        </h1>
        <div className="text-gray-500 text-sm space-y-1">
          {personalInfo?.email && <p>{personalInfo.email}</p>}
          {personalInfo?.phone && <p>{personalInfo.phone}</p>}
          {personalInfo?.address && <p>{personalInfo.address}</p>}
          {personalInfo?.linkedin && (
            <p>
              <a href={personalInfo.linkedin} className="text-gray-600 hover:text-gray-900">
                LinkedIn
              </a>
            </p>
          )}
          {personalInfo?.website && (
            <p>
              <a href={personalInfo.website} className="text-gray-600 hover:text-gray-900">
                Website
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <div className="mb-12">
          <div className="border-t border-gray-300 pt-8">
            <p className="text-gray-700 leading-relaxed text-center italic">
              {personalInfo.summary}
            </p>
          </div>
        </div>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide border-b border-gray-300 pb-2">
            EXPERIENCE
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-8">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-sans  font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
              </div>
              {exp.description && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide border-b border-gray-300 pb-2">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-sans  font-medium text-gray-900">
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

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide border-b border-gray-300 pb-2">
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-gray-700 border border-gray-300 px-3 py-1 text-sm"
              >
                {skill.skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide border-b border-gray-300 pb-2">
            PROJECTS
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-sans  font-medium text-gray-900">{project.title}</h3>
              {project.link && (
                <p className="text-gray-600 mb-2">
                  <a href={project.link} className="hover:text-gray-900">View Project</a>
                </p>
              )}
              {project.techUsed && (
                <p className="text-sm text-gray-500 mb-2">
                  {project.techUsed}
                </p>
              )}
              {project.description && (
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide border-b border-gray-300 pb-2">
            CERTIFICATIONS
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-sans  font-medium text-gray-900">{cert.title}</h3>
              <p className="text-gray-600">{cert.issuer}</p>
              <p className="text-sm text-gray-500">{cert.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements && achievements.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide border-b border-gray-300 pb-2">
            ACHIEVEMENTS
          </h2>
          {achievements.map((achievement, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-sans  font-medium text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{achievement.date}</p>
              {achievement.description && (
                <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeTemplateThree;
