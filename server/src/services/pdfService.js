const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const Resume = require('../models/Resume');
const path = require('path');

class PDFService {
  async generatePDFFromData(resumeData) {
    let browser = null;
    try {
      console.log('Starting PDF generation from data');
      
      // Load template HTML (using default template for unsaved resumes)
      const templatePath = path.join(__dirname, '../templates/pdf/default.html');
      console.log('Loading template from:', templatePath);
      
      let templateHTML = await fs.readFile(templatePath, 'utf8');
      console.log('Template loaded successfully');
      
      // Compile with Handlebars
      const template = handlebars.compile(templateHTML);
      
      // Ensure all required data exists to prevent template errors
      const safeData = {
        personalInfo: {
          fullName: resumeData.personalInfo?.name || 'No Name',
          email: resumeData.personalInfo?.email || '',
          phone: resumeData.personalInfo?.phone || '',
          location: resumeData.personalInfo?.address || ''
        },
        summary: resumeData.personalInfo?.summary || '',
        experience: resumeData.experience || [],
        education: resumeData.education || [],
        skills: resumeData.skills?.map(s => s.skill) || []
      };
      
      const html = template({
        resume: safeData
      });
      
      console.log('HTML generated successfully');
      
      // Launch Puppeteer with more explicit options
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      });
      
      console.log('Browser launched successfully');
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1600 });
      
      // Set content with longer timeout
      await page.setContent(html, { 
        waitUntil: ['networkidle0', 'domcontentloaded'],
        timeout: 30000 
      });
      
      console.log('Page content set successfully');
      
      // Generate PDF with more options
      const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0.75in',
          bottom: '0.75in',
          left: '0.75in',
          right: '0.75in'
        },
        preferCSSPageSize: true,
        timeout: 30000
      });
      
      console.log('PDF generated successfully');
      
      return pdfBuffer;
    } catch (error) {
      console.error('Detailed PDF Generation Error:', {
        error: error.message,
        stack: error.stack
      });
      throw new Error(`Failed to generate PDF: ${error.message}`);
    } finally {
      if (browser) {
        try {
          await browser.close();
          console.log('Browser closed successfully');
        } catch (err) {
          console.error('Error closing browser:', err);
        }
      }
    }
  }

  async generatePDF(resumeId, userId) {
    let browser = null;
    try {
      console.log('Starting PDF generation for resume:', resumeId);
      
      // Fetch resume data with populated user info
      const resume = await Resume.findById(resumeId)
        .populate('userId');
      
      if (!resume) {
        throw new Error('Resume not found');
      }

      if (resume.userId._id.toString() !== userId) {
        throw new Error('Unauthorized access to resume');
      }

      console.log('Resume data fetched successfully');
      
      // Determine template name, fallback to default if not specified
      const templateName = resume.template || 'default';
      
      // Load template HTML
      const templatePath = path.join(__dirname, `../templates/pdf/${templateName}.html`);
      console.log('Loading template from:', templatePath);
      
      let templateHTML;
      try {
        templateHTML = await fs.readFile(templatePath, 'utf8');
        console.log('Template loaded successfully');
      } catch (err) {
        console.error('Template loading error:', err);
        // Fallback to default template if specified template doesn't exist
        const defaultTemplatePath = path.join(__dirname, '../templates/pdf/default.html');
        templateHTML = await fs.readFile(defaultTemplatePath, 'utf8');
        console.log('Fallback to default template');
      }
      
      // Compile with Handlebars
      const template = handlebars.compile(templateHTML);
      const resumeData = resume.toObject();
      
      // Ensure all required data exists to prevent template errors
      const safeData = {
        personalInfo: {
          fullName: resumeData.personalInfo?.fullName || 'No Name',
          email: resumeData.personalInfo?.email || '',
          phone: resumeData.personalInfo?.phone || '',
          location: resumeData.personalInfo?.location || ''
        },
        summary: resumeData.summary || '',
        experience: resumeData.experience || [],
        education: resumeData.education || [],
        skills: resumeData.skills || []
      };
      
      const html = template({
        resume: safeData,
        user: resume.userId
      });
      
      console.log('HTML generated successfully');
      
      // Launch Puppeteer with more explicit options
      browser = await puppeteer.launch({
        headless: 'new', // Use new headless mode
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      });
      
      console.log('Browser launched successfully');
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1600 });
      
      // Set content with longer timeout
      await page.setContent(html, { 
        waitUntil: ['networkidle0', 'domcontentloaded'],
        timeout: 30000 
      });
      
      console.log('Page content set successfully');
      
      // Generate PDF with more options
      const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0.75in',
          bottom: '0.75in',
          left: '0.75in',
          right: '0.75in'
        },
        preferCSSPageSize: true,
        timeout: 30000
      });
      
      console.log('PDF generated successfully');
      
      return pdfBuffer;
    } catch (error) {
      console.error('Detailed PDF Generation Error:', {
        error: error.message,
        stack: error.stack,
        resumeId,
        userId
      });
      throw new Error(`Failed to generate PDF: ${error.message}`);
    } finally {
      if (browser) {
        try {
          await browser.close();
          console.log('Browser closed successfully');
        } catch (err) {
          console.error('Error closing browser:', err);
        }
      }
    }
  }
}

module.exports = new PDFService();