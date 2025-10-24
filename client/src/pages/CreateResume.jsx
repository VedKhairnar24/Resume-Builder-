import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import PersonalInfoSection from '../components/sections/PersonalInfoSection';
import EducationSection from '../components/sections/EducationSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import CertificationsSection from '../components/sections/CertificationsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import PreviewModal from '../components/PreviewModal';
import TemplateSelector from '../components/TemplateSelector';
import { saveResume, getResume } from '../services/api';
import { TEMPLATES } from '../components/templates';

const CreateResume = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('one');
  const pdfRef = useRef();

  const { control, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        website: '',
        summary: ''
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      certifications: [],
      achievements: []
    }
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: projectsFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const { fields: certificationsFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: 'certifications'
  });

  const { fields: achievementsFields, append: appendAchievement, remove: removeAchievement } = useFieldArray({
    control,
    name: 'achievements'
  });

  // Auto-save functionality
  const watchedData = watch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('resume-draft', JSON.stringify(watchedData));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [watchedData]);

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('resume-draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        reset(parsedDraft);
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, [reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSaveStatus('');
    
    try {
      await saveResume(data);
      setSaveStatus('success');
      localStorage.removeItem('resume-draft'); // Clear draft after successful save
    } catch (error) {
      console.error('Error saving resume:', error);
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const addEducation = () => {
    appendEducation({
      degree: '',
      institution: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const addExperience = () => {
    appendExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const addSkill = () => {
    appendSkill({ skill: '' });
  };

  const addProject = () => {
    appendProject({
      title: '',
      description: '',
      link: '',
      techUsed: ''
    });
  };

  const addCertification = () => {
    appendCertification({
      title: '',
      issuer: '',
      date: ''
    });
  };

  const addAchievement = () => {
    appendAchievement({
      title: '',
      description: '',
      date: ''
    });
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const downloadPDF = () => {
    const { jsPDF } = require('jspdf');
    const html2canvas = require('html2canvas');
    
    const element = pdfRef.current;
    if (!element) return;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${personalInfo?.name || 'resume'}_resume.pdf`;
      pdf.save(fileName);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Resume</h1>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handlePreview}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Preview Resume
              </button>
              <button
                type="button"
                onClick={downloadPDF}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Download PDF
              </button>
              <button
                type="submit"
                form="resume-form"
                disabled={isLoading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Resume'}
              </button>
            </div>
          </div>

          {saveStatus && (
            <div className={`mb-6 p-4 rounded-lg ${
              saveStatus === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {saveStatus === 'success' 
                ? '✅ Resume saved successfully!' 
                : '❌ Error saving resume. Please try again.'}
            </div>
          )}

          <form id="resume-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Template Selection */}
            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onTemplateChange={handleTemplateChange}
              resumeData={watchedData}
            />

            {/* Personal Information */}
            <PersonalInfoSection control={control} errors={errors} />

            {/* Education */}
            <EducationSection 
              control={control} 
              errors={errors}
              fields={educationFields}
              onAdd={addEducation}
              onRemove={removeEducation}
            />

            {/* Work Experience */}
            <ExperienceSection 
              control={control} 
              errors={errors}
              fields={experienceFields}
              onAdd={addExperience}
              onRemove={removeExperience}
            />

            {/* Skills */}
            <SkillsSection 
              control={control} 
              errors={errors}
              fields={skillsFields}
              onAdd={addSkill}
              onRemove={removeSkill}
            />

            {/* Projects */}
            <ProjectsSection 
              control={control} 
              errors={errors}
              fields={projectsFields}
              onAdd={addProject}
              onRemove={removeProject}
            />

            {/* Certifications */}
            <CertificationsSection 
              control={control} 
              errors={errors}
              fields={certificationsFields}
              onAdd={addCertification}
              onRemove={removeCertification}
            />

            {/* Achievements */}
            <AchievementsSection 
              control={control} 
              errors={errors}
              fields={achievementsFields}
              onAdd={addAchievement}
              onRemove={removeAchievement}
            />
          </form>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <PreviewModal 
          data={watchedData}
          selectedTemplate={selectedTemplate}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}

      {/* Hidden PDF Export Area */}
      <div ref={pdfRef} className="hidden">
        {(() => {
          const SelectedTemplateComponent = TEMPLATES.find(tpl => tpl.id === selectedTemplate)?.component;
          return SelectedTemplateComponent ? (
            <SelectedTemplateComponent data={watchedData} />
          ) : null;
        })()}
      </div>
    </div>
  );
};

export default CreateResume;
