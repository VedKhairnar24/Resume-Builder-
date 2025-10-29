const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const Resume = require('../models/Resume');
const path = require('path');

class PDFService {
  async generatePDF(resumeId, userId) {
    try {
      // Fetch resume data with populated user info
      const resume = await Resume.findById(resumeId)
        .populate('userId');
      
      if (!resume || resume.userId._id.toString() !== userId) {
        throw new Error('Resume not found');
      }
      
      // Load template HTML
      const templatePath = path.join(__dirname, `../templates/pdf/${resume.template}.html`);
      const templateHTML = await fs.readFile(templatePath, 'utf8');
      
      // Compile with Handlebars
      const template = handlebars.compile(templateHTML);
      const html = template({
        resume: resume.toObject(),
        user: resume.userId
      });
      
      // Launch Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '0.75in',
          bottom: '0.75in',
          left: '0.75in',
          right: '0.75in'
        }
      });
      
      await browser.close();
      
      return pdfBuffer;
    } catch (error) {
      console.error('PDF Generation Error:', error);
      throw error;
    }
  }
}

module.exports = new PDFService();