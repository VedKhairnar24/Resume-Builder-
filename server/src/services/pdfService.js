import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import Resume from '../models/Resume.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fsSync from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PDFService {
  // Utility to detect a browser executable (Chrome or Edge)
  async getBrowserExecutable() {
    const BROWSER_PATHS = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
    ];

    const foundPath = BROWSER_PATHS.find(p => fsSync.existsSync(p));
    if (!foundPath) {
      throw new Error('No supported browser found! Install Chrome or Edge.');
    }
    return foundPath;
  }

  async generatePDFFromData(resumeData) {
    let browser = null;
    try {
      console.log('Starting PDF generation from data');

      const templatePath = path.join(__dirname, '../templates/pdf/default.html');
      let templateHTML = await fs.readFile(templatePath, 'utf8');
      const template = handlebars.compile(templateHTML);

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

      const html = template({ resume: safeData });

      const executablePath = await this.getBrowserExecutable();

      browser = await puppeteer.launch({
        headless: 'new',
        executablePath,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1600 });
      await page.setContent(html, { waitUntil: ['networkidle0', 'domcontentloaded'] });

      const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: { top: '0.75in', bottom: '0.75in', left: '0.75in', right: '0.75in' },
        preferCSSPageSize: true
      });

      return pdfBuffer;
    } catch (error) {
      console.error('PDF Generation Error:', error);
      throw new Error(`Failed to generate PDF: ${error.message}`);
    } finally {
      if (browser) await browser.close();
    }
  }

  async generatePDF(resumeId, userId) {
    let browser = null;
    try {
      const resume = await Resume.findById(resumeId).populate('user');

      if (!resume) throw new Error('Resume not found');
      if (!resume.user || resume.user._id.toString() !== userId) {
        throw new Error('Unauthorized access');
      }

      const templateName = resume.template || 'default';
      const templatePath = path.join(__dirname, `../templates/pdf/${templateName}.html`);
      let templateHTML = await fs.readFile(templatePath, 'utf8').catch(async () =>
        fs.readFile(path.join(__dirname, '../templates/pdf/default.html'), 'utf8')
      );

      const template = handlebars.compile(templateHTML);
      const resumeData = resume.toObject();
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

      const html = template({ resume: safeData, user: resume.user });

      const executablePath = await this.getBrowserExecutable();

      browser = await puppeteer.launch({
        headless: 'new',
        executablePath,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      });

      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1600 });
      await page.setContent(html, { waitUntil: ['networkidle0', 'domcontentloaded'] });

      const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: { top: '0.75in', bottom: '0.75in', left: '0.75in', right: '0.75in' },
        preferCSSPageSize: true
      });

      return pdfBuffer;
    } catch (error) {
      console.error('Detailed PDF Generation Error:', error);
      throw new Error(`Failed to generate PDF: ${error.message}`);
    } finally {
      if (browser) await browser.close();
    }
  }
}

export default PDFService;
