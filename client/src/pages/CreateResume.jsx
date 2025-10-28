import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import PreviewModal from '../components/PreviewModal';
import TemplateSelector from '../components/TemplateSelector';
import { saveResume } from '../services/api';
import { TEMPLATES } from '../components/templates';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CreateResume = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('one');
  const pdfRef = useRef();
  
  const defaultValues = {
    personalInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.com',
      summary: 'Experienced professional with a track record of success'
    },
    education: [{
      degree: 'Bachelor of Science',
      institution: 'University Example',
      field: 'Computer Science',
      startDate: '2018',
      endDate: '2022'
    }],
    experience: [{
      company: 'Tech Corp',
      position: 'Software Engineer',
      startDate: '2022',
      endDate: 'Present',
      description: 'Led development of key features'
    }],
    skills: [
      { skill: 'JavaScript' },
      { skill: 'React' },
      { skill: 'Node.js' }
    ],
    projects: [{
      title: 'Project Example',
      description: 'Built a full-stack application',
      techUsed: 'React, Node.js, MongoDB'
    }],
    certifications: [{
      title: 'Web Development',
      issuer: 'Certification Authority',
      date: '2023'
    }],
    achievements: [{
      title: 'Employee of the Year',
      description: 'Recognized for outstanding performance',
      date: '2024'
    }]
  };

  const { handleSubmit, watch, control, reset } = useForm({
    defaultValues
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

  const downloadPDF = async () => {
    setIsLoading(true);
    try {
      const element = pdfRef.current;
      if (!element) {
        console.error('PDF element not found');
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
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

      const fileName = `${watchedData.personalInfo?.name || 'resume'}_resume.pdf`;
      pdf.save(fileName);
      setSaveStatus('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSaveStatus('Error generating PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Your Resume</h1>
              <p className="text-gray-600 text-sm">Build a professional resume with live preview</p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handlePreview}
                className="bg-teal-500 text-white px-6 py-2 rounded-xl hover:bg-teal-600 transition-all duration-200 font-semibold shadow-sm"
              >
                📄 Preview Resume
              </button>
              <button
                type="button"
                onClick={downloadPDF}
                disabled={isLoading}
                className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-all duration-200 font-semibold shadow-sm disabled:opacity-50"
              >
                {isLoading ? '⏳ Generating...' : '📥 Download PDF'}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(onSubmit)()}
                disabled={isLoading}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition-all duration-200 font-semibold shadow-sm disabled:opacity-50"
              >
                {isLoading ? '💾 Saving...' : '💾 Save Resume'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {saveStatus && (
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className={`p-4 rounded-xl ${
            saveStatus.includes('success') || saveStatus.includes('downloaded')
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center">
              <span className="mr-2">
                {saveStatus.includes('success') || saveStatus.includes('downloaded') ? '✅' : '❌'}
              </span>
              {saveStatus}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Template Selection */}
        <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
            resumeData={watchedData}
          />
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Live Preview</h3>
            <div className="text-sm text-gray-500">
              Template: {TEMPLATES.find(t => t.id === selectedTemplate)?.name || 'Classic'}
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
            <div className="bg-white transform scale-[0.9] origin-top" style={{ width: '111.11%', margin: '0 auto' }}>
              {(() => {
                const SelectedTemplateComponent = TEMPLATES.find(tpl => tpl.id === selectedTemplate)?.component;
                return SelectedTemplateComponent ? (
                  <SelectedTemplateComponent data={watchedData} />
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>Select a template to see preview</p>
                  </div>
                );
              })()}
            </div>
          </div>
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
