const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const Resume = require('../models/Resume');

class DOCXService {
  async generateDOCX(resumeId, userId) {
    try {
      const resume = await Resume.findById(resumeId)
        .populate('userId');
      
      if (!resume || resume.userId._id.toString() !== userId) {
        throw new Error('Resume not found');
      }
      
      // Build document sections
      const sections = [];
      
      // Header - Contact Info
      sections.push(
        new Paragraph({
          text: resume.personalInfo.fullName,
          heading: HeadingLevel.HEADING_1,
          alignment: 'center'
        }),
        new Paragraph({
          children: [
            new TextRun(`${resume.personalInfo.email} | ${resume.personalInfo.phone}`),
            new TextRun({ text: ` | ${resume.personalInfo.location}`, break: 0 })
          ],
          alignment: 'center'
        })
      );
      
      // Professional Summary
      if (resume.summary) {
        sections.push(
          new Paragraph({ text: 'PROFESSIONAL SUMMARY', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: resume.summary })
        );
      }
      
      // Work Experience
      if (resume.experience && resume.experience.length > 0) {
        sections.push(
          new Paragraph({ text: 'WORK EXPERIENCE', heading: HeadingLevel.HEADING_2 })
        );
        
        resume.experience.forEach(job => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: job.jobTitle, bold: true }),
                new TextRun(` | ${job.company} | ${job.location}`)
              ]
            }),
            new Paragraph({
              text: `${job.startDate} - ${job.current ? 'Present' : job.endDate}`,
              italics: true
            })
          );
          
          if (job.bullets) {
            job.bullets.forEach(bullet => {
              sections.push(new Paragraph({ text: `• ${bullet}`, indent: { left: 720 } }));
            });
          }
        });
      }
      
      // Education
      if (resume.education && resume.education.length > 0) {
        sections.push(
          new Paragraph({ text: 'EDUCATION', heading: HeadingLevel.HEADING_2 })
        );
        
        resume.education.forEach(edu => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true }),
                new TextRun(` | ${edu.institution}`)
              ]
            }),
            new Paragraph({ text: `Graduated: ${edu.graduationDate}` })
          );
        });
      }
      
      // Skills
      if (resume.skills && resume.skills.length > 0) {
        sections.push(
          new Paragraph({ text: 'SKILLS', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: resume.skills.join(' • ') })
        );
      }
      
      // Create document
      const doc = new Document({
        sections: [{
          properties: {},
          children: sections
        }]
      });
      
      return await Packer.toBuffer(doc);
    } catch (error) {
      console.error('DOCX Generation Error:', error);
      throw error;
    }
  }
}

module.exports = new DOCXService();