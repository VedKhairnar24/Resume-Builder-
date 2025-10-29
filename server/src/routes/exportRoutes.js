import express from 'express';
import auth from '../middleware/auth.js';
import docxService from '../services/docxService.js';
import Resume from '../models/Resume.js';
import PDFService from '../services/pdfService.js';

const router = express.Router();
const pdfService = new PDFService(); // Create an instance

// Export as PDF
router.get('/resume/:id/pdf', auth, async (req, res) => {
  try {
    const resumeId = req.params.id;
    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required' });
    }

    console.log('Starting PDF generation request for resume:', resumeId);

    // Use instance method
    const pdfBuffer = await pdfService.generatePDF(resumeId, req.user.id);

    if (!pdfBuffer || pdfBuffer.length === 0) {
      console.error('PDF Buffer is empty or null');
      return res.status(500).json({ error: 'PDF generation failed - empty buffer' });
    }

    // Fetch resume for filename
    const resume = await Resume.findById(resumeId).populate('user');

    // Check if resume exists
    if (!resume) throw new Error('Resume not found');

    // Check if user exists and matches
    if (!resume.user || resume.user._id.toString() !== req.user.id) {
      throw new Error('Unauthorized access');
    }


    const safeName = resume.personalInfo?.name?.replace(/[^a-z0-9]/gi, '_') || 'resume';
    const fileName = `${safeName}_${Date.now()}.pdf`.toLowerCase();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache');

    res.send(pdfBuffer);
    console.log('PDF sent successfully');
  } catch (error) {
    console.error('Detailed PDF Export Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

export default router;
